// Shared camp identity: the directory and detail pages always use the same color.
export const campThemes = {
  aa: { name: '奶油黄', soft: '#fbefd0', rim: '#e7ce91', ink: '#87631a' },
  a: { name: '蜜桃橘', soft: '#ffe2d8', rim: '#eab29e', ink: '#96543c' },
  d: { name: '嫩芽绿', soft: '#ddefd2', rim: '#b0d49f', ink: '#466e35' },
  g: { name: '晴空蓝', soft: '#dceffb', rim: '#a9cee5', ink: '#316f94' },
  k: { name: '青瓷绿', soft: '#d6eee8', rim: '#9dcec1', ink: '#326f62' },
  o: { name: '蔷薇粉', soft: '#f8e0e9', rim: '#e4b1c6', ink: '#93546f' },
  r: { name: '雾靛蓝', soft: '#e0e7f9', rim: '#b0bfe6', ink: '#536992' },
  u: { name: '浅薰衣草', soft: '#ece1f8', rim: '#c9b2e4', ink: '#75538e' },
}

export function campThemeStyle(id) {
  const theme = campThemes[id] || campThemes.a
  return { '--orb': theme.soft, '--rim': theme.rim, '--icon': theme.ink, '--camp-soft': theme.soft, '--camp-rim': theme.rim, '--camp-ink': theme.ink }
}
