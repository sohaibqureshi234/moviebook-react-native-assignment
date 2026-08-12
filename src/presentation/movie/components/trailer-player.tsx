import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { colors, radius, spacing, typography } from '@/core/theme';
import type { MovieTrailer } from '@/domain/entities/movie';

// Consistent https origin used for BOTH the embed URL's `origin` param and the
// WebView's baseUrl. Previously this used 'https://host.exp.Exponent/', which
// is only valid inside Expo Go — in a standalone/production build the WebView's
// real origin doesn't match, so the YouTube IFrame API silently fails to fire
// postMessage events (onReady/onStateChange never trigger). That meant the
// video would still autoplay via the raw iframe, but our JS never found out it
// had ended, so the screen never auto-closed.
const playerOrigin = 'https://tentwentymovies.app';

type TrailerPlayerProps = {
  trailer: MovieTrailer;
  onDone: () => void;
  onPlaybackError: () => void;
};

function createPlayerHtml(videoKey: string, origin: string): string {
  const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(
    videoKey,
  )}?autoplay=1&controls=1&enablejsapi=1&playsinline=1&rel=0&origin=${encodeURIComponent(
    origin,
  )}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />

  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000000;
    }

    #youtube-player {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  </style>
</head>

<body>
  <iframe
    id="youtube-player"
    width="100%"
    height="100%"
    src="${embedUrl}"
    title="Movie Trailer"
    frameborder="0"
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>

  <script>
    var player = null;
    var hasStarted = false;
    var hasFinished = false;
    var statePolling = null;

    function send(message) {
      if (
        window.ReactNativeWebView &&
        typeof window.ReactNativeWebView.postMessage === 'function'
      ) {
        window.ReactNativeWebView.postMessage(message);
      }
    }

    function finish() {
      if (hasStarted && !hasFinished) {
        hasFinished = true;

        if (statePolling) {
          clearInterval(statePolling);
          statePolling = null;
        }

        send('TRAILER_ENDED');
      }
    }

    function handleStateChange(event) {
      if (!event || typeof event.data !== 'number') {
        return;
      }

      if (event.data === 1) {
        hasStarted = true;
        send('PLAYING');
        return;
      }

      if (event.data === 0) {
        finish();
      }
    }

    function pollPlayerState() {
      if (!player || !hasStarted || hasFinished) {
        return;
      }

      try {
        var state = player.getPlayerState();

        if (state === 0) {
          finish();
          return;
        }

        // Fallback safety net: some WebView/YouTube API combinations don't
        // reliably fire the 'ended' (state === 0) event. If we're within
        // half a second of the video's known duration, treat it as ended
        // so the player doesn't get stuck on screen forever.
        var duration = player.getDuration();
        var currentTime = player.getCurrentTime();

        if (duration > 0 && currentTime >= duration - 0.5) {
          finish();
        }
      } catch (error) {
        // Ignore polling errors while the player is changing state.
      }
    }

    function initializePlayer() {
      if (!window.YT || !window.YT.Player || player) {
        return;
      }

      try {
        player = new window.YT.Player('youtube-player', {
          events: {
            onReady: function(event) {
              send('READY');

              try {
                event.target.playVideo();
              } catch (error) {
                send('PLAY_ERROR');
              }

              statePolling = setInterval(pollPlayerState, 500);
            },

            onStateChange: handleStateChange,

            onError: function(event) {
              send('PLAYER_ERROR:' + event.data);
            },

            onAutoplayBlocked: function() {
              send('AUTOPLAY_BLOCKED');
            }
          }
        });
      } catch (error) {
        send('PLAYER_INIT_ERROR');
      }
    }

    function loadYouTubeApi() {
      if (window.YT && window.YT.Player) {
        initializePlayer();
        return;
      }

      var script = document.createElement('script');

      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = function() {
        if (window.YT && window.YT.Player) {
          initializePlayer();
        }
      };

      document.head.appendChild(script);
    }

    window.onYouTubeIframeAPIReady = initializePlayer;

    loadYouTubeApi();
  </script>
</body>
</html>
`;
}

export function TrailerPlayer({
  trailer,
  onDone,
  onPlaybackError,
}: TrailerPlayerProps) {
  const insets = useSafeAreaInsets();

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;

    if (message === 'TRAILER_ENDED') {
      onDone();
      return;
    }

    if (
      message === 'PLAY_ERROR' ||
      message === 'AUTOPLAY_BLOCKED' ||
      message === 'PLAYER_INIT_ERROR'
    ) {
      onPlaybackError();
      return;
    }

    if (message.startsWith('PLAYER_ERROR:')) {
      const errorCode = message.replace('PLAYER_ERROR:', '');

      if (errorCode === '101' || errorCode === '150' || errorCode === '153') {
        onPlaybackError();
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        applicationNameForUserAgent="TenTwentyMovies/1.0.0"
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        domStorageEnabled
        javaScriptEnabled
        mediaPlaybackRequiresUserAction={false}
        onError={onPlaybackError}
        onHttpError={(event) => {
          if (event.nativeEvent.statusCode >= 400) {
            onPlaybackError();
          }
        }}
        onMessage={handleMessage}
        originWhitelist={['https://*']}
        source={{
          html: createPlayerHtml(trailer.videoKey, playerOrigin),
          baseUrl: playerOrigin,
        }}
        style={styles.player}
      />

      <Pressable
        accessibilityLabel="Done"
        accessibilityRole="button"
        onPress={onDone}
        style={[
          styles.doneButton,
          {
            top: insets.top + spacing.md,
          },
        ]}>
        <Text style={styles.doneLabel}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.videoBackground,
    flex: 1,
  },

  player: {
    backgroundColor: colors.videoBackground,
    flex: 1,
  },

  doneButton: {
    backgroundColor: colors.videoControl,
    borderRadius: radius.control,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    position: 'absolute',
    right: spacing.lg,
  },

  doneLabel: {
    ...typography.body,
    color: colors.onPrimary,
    fontFamily: typography.sectionTitle.fontFamily,
    fontWeight: typography.sectionTitle.fontWeight,
  },
});