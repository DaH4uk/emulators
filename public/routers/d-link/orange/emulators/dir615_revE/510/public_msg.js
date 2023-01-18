var subnet_mask = new Array(0, 128, 192, 224, 240, 248, 252, 254, 255);
var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var monthShow = new Array(tt_Jan, tt_Feb, tt_Mar, tt_Apr, tt_May, tt_Jun, tt_Jul, tt_Aug, tt_Sep, tt_Oct, tt_Nov, tt_Dec);
var sequence = new Array("1st", "2nd", "3rd", "4th", "5th", "6th");

var default_virtual = new Array(new rule_obj("TELNET", "6", 23, 23),
							 				new rule_obj("HTTP", "6", 80, 80),
							 				new rule_obj("HTTPS", "6", 443, 443),
							 				new rule_obj("FTP", "6", 21, 21),
							 				new rule_obj("DNS", "17", 53, 53),
							 				new rule_obj("SMTP", "6", 25, 25),
							 				new rule_obj("POP3", "6", 110, 110),
							 				new rule_obj("H.323", "6", 1720, 1720),
							 				new rule_obj("REMOTE DESKTOP", "6", 3389, 3389),
							 				new rule_obj("PPTP", "6", 1723, 1723),
							 				new rule_obj("L2TP", "17", 1701, 1701),
							 				new rule_obj("Wake-On-LAN", "17", 9, 9)
						  );

var default_rule = new Array(new rule_obj("Age of Empires", "TCP", "2302-2400,6073", "2302-2400,6073"),
							 new rule_obj("Aliens vs. Predator", "TCP", "80,2300-2400,8000-8999", "80,2300-2400,8000-8999"),
							 new rule_obj("America's Army", "TCP", "20045", "1716-1718,8777,27900"),
							 new rule_obj("Asheron's Call", "TCP", "9000-9013", "2001,9000-9013"),
							 new rule_obj("Battlefield 1942", "TCP", "", "14567,22000,23000-23009,27900,28900"),
							 new rule_obj("Battlefield 2", "TCP", "80,4711,29900,29901,29920,28910", "1500-4999,16567,27900,29900,29910,27901,55123,55124,55215"),
							 new rule_obj("Battlefield: Vietnam", "TCP", "", "4755,23000,22000,27243-27245"),
							 new rule_obj("BitTorrent", "TCP", "6881-6889", ""),
							 new rule_obj("Black and White", "TCP", "2611-2612,6500,6667,27900", "2611-2612,6500,6667,27900"),
							 new rule_obj("Call of Duty", "TCP", "28960", "20500,20510,28960"),
							 new rule_obj("Command and Conquer Generals", "TCP", "80,6667,28910,29900,29920", "4321,27900"),
							 new rule_obj("Command and Conquer Zero Hour", "TCP", "80,6667,28910,29900,29920", "4321,27900"),
							 new rule_obj("Counter Strike", "TCP", "27030-27039", "1200,27000-27015"),
							 new rule_obj("D-Link DVC-1000", "TCP", "1720,15328-15333", "15328-15333"),
							 new rule_obj("Dark Reign 2", "TCP", "26214", "26214"),
							 new rule_obj("Delta Force", "TCP", "3100-3999", "3568"),
							 new rule_obj("Diablo I and II", "TCP", "6112-6119,4000", "6112-6119"),
							 new rule_obj("Doom 3", "TCP", "", "27666"),
							 new rule_obj("Dungeon Siege", "TCP", "", "6073,2302-2400"),
							 new rule_obj("eDonkey", "TCP", "4661-4662", "4665"),
							 new rule_obj("eMule", "TCP", "4661-4662,4711", "4672,4665"),
							 new rule_obj("Everquest", "TCP", "1024-6000,7000", "1024-6000,7000"),
							 new rule_obj("Far Cry", "TCP", "", "49001,49002"),
							 new rule_obj("Final Fantasy XI (PC)", "TCP", "25,80,110,443,50000-65535", "50000-65535"),
							 new rule_obj("Final Fantasy XI (PS2)", "TCP", "1024-65535", "50000-65535"),
							 new rule_obj("Gamespy Arcade", "TCP", "", "6500"),
							 new rule_obj("Gamespy Tunnel", "TCP", "", "6700"),
							 new rule_obj("Ghost Recon", "TCP", "2346-2348", "2346-2348"),
							 new rule_obj("Gnutella", "TCP", "6346", "6346"),
							 new rule_obj("Half Life", "TCP", "6003, 7002", "27005,27010,27011,27015"),
							 new rule_obj("Halo: Combat Evolved", "TCP", "", "2302,2303"),
							 new rule_obj("Heretic II", "TCP", "28910", "28910"),
							 new rule_obj("Hexen II", "TCP", "26900", "26900"),
							 new rule_obj("Jedi Knight II: Jedi Outcast", "TCP", "", "28060,28061,28062,28070-28081"),
							 new rule_obj("Jedi Knight III: Jedi Academy", "TCP", "", "28060,28061,28062,28070-28081"),
							 new rule_obj("KALI", "TCP", "", "2213,6666"),
							 new rule_obj("Links", "TCP", "2300-2400,47624", "2300-2400,6073"),
							 new rule_obj("Medal of Honor: Games", "TCP", "12203-12204", ""),
							 new rule_obj("MSN Game Zone", "TCP", "6667", "28800-29000"),
							 new rule_obj("MSN Game Zone (DX)", "TCP", "2300-2400,47624", "2300-2400"),
							 new rule_obj("Myth", "TCP", "3453", "3453"),
							 new rule_obj("Need for Speed", "TCP", "9442", "9442"),
							 new rule_obj("Need for Speed 3", "TCP", "1030", "1030"),
							 new rule_obj("Need for Speed: Hot Pursuit 2", "TCP", "8511,28900", "1230,8512,27900,61200-61230"),
							 new rule_obj("Neverwinter Nights", "TCP", "", "5120-5300,6500,27900,28900"),
							 new rule_obj("PainKiller", "TCP", "", "3455"),
							 new rule_obj("PlayStation2", "TCP", "4658,4659", "4658,4659"),
							 new rule_obj("Postal 2: Share the Pain", "TCP", "80", "7777-7779,27900,28900"),
							 new rule_obj("Quake 2", "TCP", "27910", "27910"),
							 new rule_obj("Quake 3", "TCP", "27660,27960", "27660,27960"),
							 new rule_obj("Rainbow Six", "TCP", "2346", "2346"),
							 new rule_obj("Rainbow Six: Raven Shield", "TCP", "", "7777-7787,8777-8787"),
							 new rule_obj("Return to Castle Wolfenstein", "TCP", "", "27950,27960,27965,27952"),
							 new rule_obj("Rise of Nations", "TCP", "", "34987"),
							 new rule_obj("Roger Wilco", "TCP", "3782", "27900,28900,3782-3783"),
							 new rule_obj("Rogue Spear", "TCP", "2346", "2346"),
							 new rule_obj("Serious Sam II", "TCP", "25600-25605", "25600-25605"),
							 new rule_obj("Shareaza", "TCP", "6346", "6346"),
							 new rule_obj("Silent Hunter II", "TCP", "3000", "3000"),
							 new rule_obj("Soldier of Fortune", "TCP", "", "28901,28910,38900-38910,22100-23000"),
							 new rule_obj("Soldier of Fortune II: Double Helix", "TCP", "", "20100-20112"),
							 new rule_obj("Splinter Cell: Pandora Tomorrow", "TCP", "40000-43000", "44000-45001,7776,8888"),
							 new rule_obj("Star Trek: Elite Force II", "TCP", "", "29250,29256"),
							 new rule_obj("Starcraft", "TCP", "6112-6119,4000", "6112-6119"),
							 new rule_obj("Starsiege Tribes", "TCP", "", "27999,28000"),
							 new rule_obj("Steam", "TCP", "27030-27039", "1200,27000-27015"),
							 new rule_obj("SWAT 4", "TCP", "", "10480-10483"),
							 new rule_obj("TeamSpeak", "TCP", "", "8767"),
							 new rule_obj("Tiberian Sun", "TCP", "1140-1234,4000", "1140-1234,4000"),
							 new rule_obj("Tiger Woods 2K4", "TCP", "80,443,1791-1792,13500,20801-20900,32768-65535", "80,443,1791-1792,13500,20801-20900,32768-65535"),
							 new rule_obj("Tribes of Vengeance", "TCP", "7777,7778,28910", "6500,7777,7778,27900"),
							 new rule_obj("Ubi.com", "TCP", "40000-42999", "41005"),
							 new rule_obj("Ultima", "TCP", "5001-5010,7775-7777,7875,8800-8900,9999", "5001-5010,7775-7777,7875,8800-8900,9999"),
							 new rule_obj("Unreal", "TCP", "7777,8888,27900", "7777-7781"),
							 new rule_obj("Unreal Tournament", "TCP", "7777-7783,8080,27900", "7777-7783,8080,27900"),
							 new rule_obj("Unreal Tournament 2004", "TCP", "28902", "7777-7778,7787-7788"),
							 new rule_obj("Vietcong", "TCP", "", "5425,15425,28900"),
							 new rule_obj("Warcraft II", "TCP", "6112-6119,4000", "6112-6119"),
							 new rule_obj("Warcraft III", "TCP", "6112-6119,4000", "6112-6119"),
							 new rule_obj("WinMX", "TCP", "6699", "6257"),
							 new rule_obj("Wolfenstein: Enemy Territory", "TCP", "", "27950,27960,27965,27952"),
							 new rule_obj("WON Servers", "TCP", "27000-27999", "15001,15101,15200,15400"),
							 new rule_obj("World of Warcraft", "TCP", "3724,6112,6881-6999", ""),
							 new rule_obj("Xbox Live", "TCP", "3074", "88,3074")
						  );

var default_appl = new Array(new appl_obj("AIM Talk", "TCP", "4099", "TCP", "5190"),
							 new appl_obj("BitTorrent", "TCP", "6969", "TCP", "6881-6889"),
							 new appl_obj("Calista IP phone", "TCP", "5190", "UDP", "3000"),
							 new appl_obj("ICQ", "UDP", "4000", "TCP", "20000,20019,20039,20059"),
							 new appl_obj("PalTalk", "TCP", "5001-5020", "Any", "2090,2091,2095")
							);

var all_ip_addr_msg = new Array(MSG006,	// INVALID_IP
						       MSG007,	// ZERO_IP
						       MSG002,	// FIRST_IP_ERROR
						       MSG003,	// SECOND_IP_ERROR
						       MSG004,	// THIRD_IP_ERROR
						       MSG005,	// FOURTH_IP_ERROR
						       MSG026,			// FIRST_RANGE_ERROR
						       MSG027,			// SECOND_RANGE_ERROR
						       MSG028,			// THIRD_RANGE_ERROR
						       MSG029,		// FOURTH_RANGE_ERROR
						       MSG008,		// RADIUS_SERVER_PORT_ERROR
						       MSG009,		// RADIUS_SERVER_SECRET_ERROR
						       MSG010			// MULTICASE_IP_ERROR
						      );

var subnet_mask_msg = new Array(ar_alert_5,	// INVALID_IP
					           ar_alert_5,	// ZERO_IP
					           ar_alert_5,	// FIRST_IP_ERROR
					    	   ar_alert_5,	// SECOND_IP_ERROR
					    	   ar_alert_5,	// THIRD_IP_ERROR
					    	   ar_alert_5,	// FOURTH_IP_ERROR
					    	   ar_alert_5,			// FIRST_RANGE_ERROR
					    	   ar_alert_5,			// SECOND_RANGE_ERROR
					    	   ar_alert_5,			// THIRD_RANGE_ERROR
					    	   ar_alert_5			// FOURTH_RANGE_ERROR
					          );
var metric_msg = new Array(MSG043,
						 MSG043,
						 ar_alert_3
						  );

var INVALID_IP = 0;
var ZERO_IP = 1;
var FIRST_IP_ERROR = 2;
var SECOND_IP_ERROR = 3;
var THIRD_IP_ERROR = 4;
var FOURTH_IP_ERROR = 5;
var FIRST_RANGE_ERROR = 6;
var SECOND_RANGE_ERROR = 7;
var THIRD_RANGE_ERROR = 8;
var FOURTH_RANGE_ERROR = 9;
var RADIUS_SERVER_PORT_ERROR = 10;	// for radius server
var RADIUS_SERVER_SECRET_ERROR = 11; // for radius server
var MULTICASE_IP_ERROR = 12;

var check_num_msg = new Array(MSG012,
						 MSG013,
						 MSG014,
						 MSG015
						 );

var EMPTY_VARIBLE_ERROR = 0;
var INVALID_VARIBLE_ERROR = 1;
var VARIBLE_RANGE_ERROR = 2;
var EVEN_NUMBER_ERROR = 3;
/** the end of check_varible() using **/
/** for ipv6 error message as following **/

var all_ipv6_addr_msg = new Array(MSG006,	// INVALID_IP
						       MSG007,	// ZERO_IP such as '::' symbol
						       MSG018,	// FIRST_IP_ERROR
						       MSG019,	// SECOND_IP_ERROR
						       MSG020,	// THIRD_IP_ERROR
						       MSG021,	// FOURTH_IP_ERROR
						       MSG022,	// FIFTH_IP_ERROR
						       MSG023,	// SIXTH_IP_ERROR
						       MSG024,	// SEVENTH_IP_ERROR
						       MSG025,	// EIGHTH_IP_ERROR
						       MSG026,		// FIRST_RANGE_ERROR
						       MSG027,		// SECOND_RANGE_ERROR
						       MSG028,		// THIRD_RANGE_ERROR
						       MSG029,		// FOURTH_RANGE_ERROR
						       MSG030,		// FIFTH_RANGE_ERROR
						       MSG031,		// SIXTH_RANGE_ERROR
						       MSG032,		// SEVENTH_RANGE_ERROR
						       MSG033,		// EIGHTH_RANGE_ERROR
                               "",                      // RADIUS_SERVER_PORT_ERROR
                               "",                      // RADIUS_SERVER_SECRET_ERROR
  						       MSG034,  // LOOPBACK_IP_ERROR
  						       MSG035  // MULTICASE_IP_ERROR	
                              );

var IPv6_INVALID_IP = 0;
var IPv6_ZERO_IP = 1;
var IPv6_FIRST_IP_ERROR = 2;
var IPv6_SECOND_IP_ERROR = 3;
var IPv6_THIRD_IP_ERROR = 4;
var IPv6_FOURTH_IP_ERROR = 5;
var IPv6_FIFTH_IP_ERROR =6;
var IPv6_SIXTH_IP_ERROR =7;
var IPv6_SEVENTH_IP_ERROR =8;
var IPv6_EIGHTH_IP_ERROR=9;
var IPv6_FIRST_RANGE_ERROR = 10;
var IPv6_SECOND_RANGE_ERROR = 11;
var IPv6_THIRD_RANGE_ERROR = 12;
var IPv6_FOURTH_RANGE_ERROR = 13;
var IPv6_FIFTH_RANGE_ERROR =14;
var IPv6_SIXTH_RANGE_ERROR =15;
var IPv6_SEVENTH_RANGE_ERROR = 16;
var IPv6_EIGHTH_RANGE_ERROR =17;
var IPv6_RADIUS_SERVER_PORT_ERROR = 18; // for radius server
var IPv6_RADIUS_SERVER_SECRET_ERROR = 19; // for radius server
var IPv6_LOOPBACK_IP_ERROR =20;
var IPv6_MULTICASE_IP_ERROR =21;
