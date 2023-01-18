



















function IPv4(/* IPv4 | IP/mask | (IP, mask) */){
	
	var self = this;
	var $$ = {
		ip: [ 0, 0, 0, 0 ],
		mask: null
	};
	
	var zero = '00000000000000000000000000000000';
	var full = '11111111111111111111111111111111';
	
	function byteToBitset(byte){
		var bitset = '';
		for (var i = 7; i >= 0; i--){
			bitset += (byte & (1 << i))?'1':'0';
		}
		return bitset;
	}
	
	function bitsetToByte(bitset){
		bitset = bitset.split('');
		return (bitset[0]*128 + bitset[1]*64 + bitset[2]*32 + bitset[3]*16 +
				bitset[4]*8 + bitset[5]*4 + bitset[6]*2 + bitset[7]*1);
	}
	
	function hostToIndex(host){
		var index = 0, R = 1;
		for (var i = host.length - 1; i >= 0; i--) {
			index += host[i]*R;
			R *= 256;
		}
		return index;
	}
	
	function toBitset(ip){
		var bitset = new IPv4(ip).ip();
		for (var i = 0; i < 4; i++) {
			bitset[i] = byteToBitset(bitset[i]);
		}
		return bitset.join('');
	}
	
	function fromBitset(bitset, shortmask){
		var ip = new Array();
		for (var i = 0; i < 4; i++) {
			ip.push(bitsetToByte(bitset.substr(i*8, 8)));
		}
		return new IPv4(ip.join('.'), shortmask);
	}
	
	this.toSerial = function(){
		return hostToIndex(this.ip());
	}
	
	this.fromSerial = function(serial){
		var ip = [0, 0, 0, 0];
		for (var i = 3; i >= 0; i--){
			ip[i] = serial%256;
			serial = Math.floor(serial/256);
		}
		return new IPv4(ip.join('.'), this.shortmask());
	}
	
	this.ip = function(){
		return copy($$.ip);
	}
	
	this.mask = function(){
		return $$.mask;
	}	
	
	this.subnet = function(){
		var shortmask = this.shortmask();
		return this.ip().slice(0, Math.floor(shortmask/8));
	}
	
	this.host = function(){
		var shortmask = this.shortmask();
		return this.ip().splice(Math.floor(shortmask/8), 4);
	}
	
	this.netclass = function(){
		var n = $$.ip[0];
		if (n >= 0 && n < 128) return 'A';
		if (n >= 128 && n < 192) return 'B';
		if (n >= 192 && n < 224) return 'C';
		if (n >= 224 && n < 240) return 'D';
		return 'E';
	}
	
	this.shortmask = function(){
		if (is.set($$.mask)) return $$.mask;
		var type = this.netclass();
		if (type == 'A') return 8;
		if (type == 'B') return 16;
		if (type == 'C') return 24;
		return 0;
	}
	
	this.netmask = function(){
		var shortmask = this.shortmask();
		return fromBitset(full.substr(0, shortmask) + zero.substr(shortmask, 32 - shortmask), shortmask);
	}
	
	this.wildcard = function(){
		var shortmask = this.shortmask();
		return fromBitset(zero.substr(0, shortmask) + full.substr(0, 32 - shortmask), shortmask);
	}

	this.network = function(){
		var shortmask = this.shortmask();
		return fromBitset(toBitset(this).substr(0, shortmask) + zero.substr(0, 32 - shortmask), shortmask);
	}
	
	this.broadcast = function(){
		var shortmask = this.shortmask();
		return fromBitset(toBitset(this).substr(0, shortmask) + full.substr(0, 32 - shortmask), shortmask);
	}
	
	this.hostmin = function(){
		var shortmask = this.shortmask();
		return fromBitset(toBitset(this).substr(0, shortmask) + zero.substr(0, 31 - shortmask) + '1', shortmask);
	}
	
	this.hostmax = function(){
		var shortmask = this.shortmask();
		return fromBitset(toBitset(this).substr(0, shortmask) + full.substr(0, 31 - shortmask) + '0', shortmask);
	}
	
	this.count = function(){
		var shortmask = this.shortmask();
		return Math.pow(2, 32 - shortmask) - 2;
	}
	
	this.index = function(){
		return (hostToIndex(this.host()) - hostToIndex(this.network().host()));
	}
	
	this.fromRange = function(begin, end){
		begin = new IPv4(begin, this.shortmask());
		end = new IPv4(end, this.shortmask());
		if (begin.subnet().join('.') == end.subnet().join('.') && begin.subnet().join('.') == this.subnet().join('.')) {
			var serial = this.toSerial();
			if (serial >= begin.toSerial() && serial <= end.toSerial()) {
				return true;
			}
		}
		return false;
	}
	
	this.inc = function(n){
		if (is.unset(n)) n = 1;
		return this.fromSerial(this.toSerial() + n);
	}
	
	this.dec = function(n){
		if (is.unset(n)) n = 1;
		return this.fromSerial(this.toSerial() - n);;
	}
	
	this.toString = function(bitmask){
		var ipstr = $$.ip.join('.');
		if(bitmask){
			ipstr += "/" + this.shortmask();
		}
		return ipstr;
	}
	
	this.reserved = function(){
		var n = this.network().toString();
		var ip = this.toString();
		if(n == ip) return 'network';						
		switch(n){
			case '0.0.0.0':		return 'defroute';
			case '127.0.0.0':	return 'loopback';
			case '169.254.0.0':	return 'linklocal';
			case '240.0.0.0':	return 'future';
			case '192.88.99.0':	return 'anycast';
			case '224.0.0.0':	return 'multicast';
		}
		if(ip == this.broadcast().toString()) return 'broadcast';
		
		return null;
	}
	
	// Init
	if (arguments[0] instanceof IPv4) {
		$$.ip = arguments[0].ip();
		$$.mask = arguments[0].shortmask();
	} else if (is.string(arguments[0])) {
		var temp = arguments[0].split('/', 2);
		$$.ip = temp[0].split('.', 4);
		$$.mask = temp[1];
	}
	if (is.number(arguments[1])) {
		$$.mask = arguments[1];
	} else if (is.string(arguments[1])) {
		$$.mask = toBitset(arguments[1]).indexOf('0');
		$$.mask = ($$.mask==-1)?32:$$.mask;
	}
}
