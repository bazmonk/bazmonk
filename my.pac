function FindProxyForURL(url, host) {

    // Log to chrome://net-internals/#events for debugging.
    alert("ssh-proxy.pac: STARTING")

    var host_ip = dnsResolve(host);

    // 3333/3334 are for sg-crt and sb
    var NERSC_PROXY = "SOCKS 127.0.0.1:3333; SOCKS 127.0.0.1:3334; DIRECT"

    // 7020-7022 are mouse-r[11-13]
    var OMNI_PROXY = "SOCKS 127.0.0.1:7020; SOCKS 127.0.0.1:7021; SOCKS 127.0.0.1:7022; DIRECT"

    // Host matches that use the NERSC HTTP proxy.
    var URLs = [
        "128.55.168.*",
        "*.nersc.org",
        "*.nersc.gov",
    ];

    if (isInNet(host_ip, "192.168.84.0", "255.255.252.0") ||  // ovirtmgmt
            isInNet(host_ip, "192.168.88.0", "255.255.252.0") ||  // pdu
            isInNet(host_ip, "192.168.93.0", "255.255.255.0") ||  // modbus
            isInNet(host_ip, "192.168.94.0", "255.255.255.0") ||  // onewire
            isInNet(host_ip, "192.168.95.0", "255.255.255.0") ||  // ipmi/switches
            isInNet(host_ip, "192.168.96.0", "255.255.255.0") ||  // boot
            isInNet(host_ip, "131.243.121.0", "255.255.255.0") || // bms/webctrl
            isInNet(host_ip, "128.55.210.0", "255.255.255.0") ||  //
            isInNet(host_ip, "128.55.211.0", "255.255.255.0") ||  // OTG subnet
            isInNet(host_ip, "192.168.76.0", "255.255.252.0") ) { // OTG subnet
                return OMNI_PROXY;
    }

    // Check all host patterns and network masks.
    for (var i = 0; i < URLs.length; i++) {

        // Look for NERSC hosts, excluding blacklisted hosts
        if (shExpMatch(host, URLs[i])) {
            return NERSC_PROXY;
        }

    }
}
