function FindProxyForURL(uri, host) {
  return "SOCKS5 127.0.0.1:3333; SOCKS5 127.0.0.1:3334; DIRECT";
}
