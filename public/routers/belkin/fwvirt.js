/* MACRO FUNCTION DECLARATIONS */
virtual_server_MAX_NUM = 141;
    var virtual_server = new Array(virtual_server_MAX_NUM);
    virtual_server[0] = new ObjVirServer("Active Worlds",4);
        virtual_server[0].entry[0] = new ObjVirtualServer("Active Worlds", true, "Active Worlds", "3000", "3000", "TCP", "", "3000", "3000");
        virtual_server[0].entry[1] = new ObjVirtualServer("Active Worlds", true, "Active Worlds", "5670", "5670", "TCP", "", "5670", "5670");
        virtual_server[0].entry[2] = new ObjVirtualServer("Active Worlds", true, "Active Worlds", "7777", "7777", "TCP", "", "7777", "7777");
        virtual_server[0].entry[3] = new ObjVirtualServer("Active Worlds", true, "Active Worlds", "7000", "7000", "TCP", "", "7000", "7000");
    virtual_server[1] = new ObjVirServer("Age of Kings",3);
        virtual_server[1].entry[0] = new ObjVirtualServer("Age of Kings", true, "Age of Kings", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[1].entry[1] = new ObjVirtualServer("Age of Kings", true, "Age of Kings", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[1].entry[2] = new ObjVirtualServer("Age of Kings", true, "Age of Kings", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[2] = new ObjVirServer("Age of Wonders",3);
        virtual_server[2].entry[0] = new ObjVirtualServer("Age of Wonders", true, "Age of Wonders", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[2].entry[1] = new ObjVirtualServer("Age of Wonders", true, "Age of Wonders", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[2].entry[2] = new ObjVirtualServer("Age of Wonders", true, "Age of Wonders", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[3] = new ObjVirServer("Aliens vs. Predator",3);
        virtual_server[3].entry[0] = new ObjVirtualServer("Aliens vs. Predator", true, "Aliens vs. Predator", "80", "80", "UDP", "", "80", "80");
        virtual_server[3].entry[1] = new ObjVirtualServer("Aliens vs. Predator", true, "Aliens vs. Predator", "2300", "2400", "UDP", "", "2300", "2400");
        virtual_server[3].entry[2] = new ObjVirtualServer("Aliens vs. Predator", true, "Aliens vs. Predator", "8000", "8999", "UDP", "", "8000", "8999");
    virtual_server[4] = new ObjVirServer("Anarchy Online (BETA)",2);
        virtual_server[4].entry[0] = new ObjVirtualServer("Anarchy Online (BETA)", true, "Anarchy Online (BETA)", "7013", "7013", "BOTH", "", "7013", "7013");
        virtual_server[4].entry[1] = new ObjVirtualServer("Anarchy Online (BETA)", true, "Anarchy Online (BETA)", "7500", "7501", "BOTH", "", "7500", "7501");
    virtual_server[5] = new ObjVirServer("AOL Instant Messenger",1);
        virtual_server[5].entry[0] = new ObjVirtualServer("AOL Instant Messenger", true, "AOL Instant Messenger", "443", "443", "TCP", "", "443", "443");
    virtual_server[6] = new ObjVirServer("Audiogalaxy Satellite",2);
        virtual_server[6].entry[0] = new ObjVirtualServer("Audiogalaxy Satellite", true, "Audiogalaxy Satellite", "41000", "50000", "TCP", "", "41000", "50000");
        virtual_server[6].entry[1] = new ObjVirtualServer("Audiogalaxy Satellite", true, "Audiogalaxy Satellite", "1117", "5190", "TCP", "", "1117", "5190");
    virtual_server[7] = new ObjVirServer("Baldurs Gate",1);
        virtual_server[7].entry[0] = new ObjVirtualServer("Baldur's Gate", true, "Baldur's Gate", "47624", "47624", "BOTH", "", "47624", "47624");
    virtual_server[8] = new ObjVirServer("BattleCom",2);
        virtual_server[8].entry[0] = new ObjVirtualServer("BattleCom", true, "BattleCom", "47624", "47624", "BOTH", "", "47624", "47624");
        virtual_server[8].entry[1] = new ObjVirtualServer("BattleCom", true, "BattleCom", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[9] = new ObjVirServer("Battlefield Communicator",1);
        virtual_server[9].entry[0] = new ObjVirtualServer("Battlefield Communicator", true, "Battlefield Communicator", "47624", "47624", "BOTH", "", "47624", "47624");
    virtual_server[10] = new ObjVirServer("Black and White",4);
        virtual_server[10].entry[0] = new ObjVirtualServer("Black and White", true, "Black and White", "2611", "2612", "TCP", "", "2611", "2612");
        virtual_server[10].entry[1] = new ObjVirtualServer("Black and White", true, "Black and White", "6667", "6667", "TCP", "", "6667", "6667");
        virtual_server[10].entry[2] = new ObjVirtualServer("Black and White", true, "Black and White", "6500", "6500", "UDP", "", "6500", "6500");
        virtual_server[10].entry[3] = new ObjVirtualServer("Black and White", true, "Black and White", "27900", "27900", "UDP", "", "27900", "27900");
    virtual_server[11] = new ObjVirServer("Blizzard Battle.net",2);
        virtual_server[11].entry[0] = new ObjVirtualServer("Blizzard Battle.net", true, "Blizzard Battle.net", "4000", "4000", "TCP", "", "4000", "4000");
        virtual_server[11].entry[1] = new ObjVirtualServer("Blizzard Battle.net", true, "Blizzard Battle.net", "6112", "6112", "BOTH", "", "6112", "6112");
    virtual_server[12] = new ObjVirServer("Buddy Phone",1);
        virtual_server[12].entry[0] = new ObjVirtualServer("Buddy Phone", true, "Buddy Phone", "700", "701", "UDP", "", "700", "701");
    virtual_server[13] = new ObjVirServer("Bungie.net",1);
        virtual_server[13].entry[0] = new ObjVirtualServer("Bungie.net", true, "Bungie.net", "3453", "3453", "TCP", "", "3453", "3453");
    virtual_server[14] = new ObjVirServer("Camerades",1);
        virtual_server[14].entry[0] = new ObjVirtualServer("Camerades", true, "Camerades", "2047", "2048", "BOTH", "", "2047", "2048");
    virtual_server[15] = new ObjVirServer("CART Precision Racing",3);
        virtual_server[15].entry[0] = new ObjVirtualServer("CART Precision Racing", true, "CART Precision Racing", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[15].entry[1] = new ObjVirtualServer("CART Precision Racing", true, "CART Precision Racing", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[15].entry[2] = new ObjVirtualServer("CART Precision Racing", true, "CART Precision Racing", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[16] = new ObjVirServer("Close Combat for Windows",3);
        virtual_server[16].entry[0] = new ObjVirtualServer("Close Combat for Windows", true, "Close Combat for Windows", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[16].entry[1] = new ObjVirtualServer("Close Combat for Windows", true, "Close Combat for Windows", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[16].entry[2] = new ObjVirtualServer("Close Combat for Windows", true, "Close Combat for Windows", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[17] = new ObjVirServer("Close Combat III: The Russian Front",3);
        virtual_server[17].entry[0] = new ObjVirtualServer("Close Combat III: The Russian Front", true, "The Russian Front", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[17].entry[1] = new ObjVirtualServer("Close Combat III: The Russian Front", true, "The Russian Front", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[17].entry[2] = new ObjVirtualServer("Close Combat III: The Russian Front", true, "The Russian Front", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[18] = new ObjVirServer("Close Combat: A Bridge Too Far",3);
        virtual_server[18].entry[0] = new ObjVirtualServer("Close Combat: A Bridge Too Far", true, "A Bridge Too Far", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[18].entry[1] = new ObjVirtualServer("Close Combat: A Bridge Too Far", true, "A Bridge Too Far", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[18].entry[2] = new ObjVirtualServer("Close Combat: A Bridge Too Far", true, "A Bridge Too Far", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[19] = new ObjVirServer("Combat Flight Simulator 2: WWII Pacific Theater",3);
        virtual_server[19].entry[0] = new ObjVirtualServer("Combat Flight Simulator 2: WWII Pacific Theater", true, "WWII Pacific Theater", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[19].entry[1] = new ObjVirtualServer("Combat Flight Simulator 2: WWII Pacific Theater", true, "WWII Pacific Theater", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[19].entry[2] = new ObjVirtualServer("Combat Flight Simulator 2: WWII Pacific Theater", true, "WWII Pacific Theater", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[20] = new ObjVirServer("Combat Flight Simulator: WWII Europe Series",3);
        virtual_server[20].entry[0] = new ObjVirtualServer("Combat Flight Simulator: WWII Europe Series", true, "WWII Europe Series", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[20].entry[1] = new ObjVirtualServer("Combat Flight Simulator: WWII Europe Series", true, "WWII Europe Series", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[20].entry[2] = new ObjVirtualServer("Combat Flight Simulator: WWII Europe Series", true, "WWII Europe Series", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[21] = new ObjVirServer("Crimson Skies",4);
        virtual_server[21].entry[0] = new ObjVirtualServer("Crimson Skies", true, "Crimson Skies", "28805", "28805", "TCP", "", "28805", "28805");
        virtual_server[21].entry[1] = new ObjVirtualServer("Crimson Skies", true, "Crimson Skies", "28801", "28801", "TCP", "", "28801", "28801");
        virtual_server[21].entry[2] = new ObjVirtualServer("Crimson Skies", true, "Crimson Skies", "3040", "3040", "TCP", "", "3040", "3040");
        virtual_server[21].entry[3] = new ObjVirtualServer("Crimson Skies", true, "Crimson Skies", "1121", "1121", "TCP", "", "1121", "1121");
    virtual_server[22] = new ObjVirServer("Dark Reign",1);
        virtual_server[22].entry[0] = new ObjVirtualServer("Dark Reign", true, "Dark Reign", "21154", "21156", "UDP", "", "21154", "21156");
    virtual_server[23] = new ObjVirServer("Dark Reign 2",1);
        virtual_server[23].entry[0] = new ObjVirtualServer("Dark Reign 2", true, "Dark Reign 2", "26214", "26214", "BOTH", "", "26214", "26214");
    virtual_server[24] = new ObjVirServer("Delta Force 2",1);
        virtual_server[24].entry[0] = new ObjVirtualServer("Delta Force 2", true, "Delta Force 2", "3568", "3569", "UDP", "", "3568", "3569");
    virtual_server[25] = new ObjVirServer("Delta Three PC to Phone",6);
        virtual_server[25].entry[0] = new ObjVirtualServer("Delta Three PC to Phone", true, "Delta Three PC to Phone", "12053", "12053", "TCP", "", "12053", "12053");
        virtual_server[25].entry[1] = new ObjVirtualServer("Delta Three PC to Phone", true, "Delta Three PC to Phone", "12083", "12083", "TCP", "", "12083", "12083");
        virtual_server[25].entry[2] = new ObjVirtualServer("Delta Three PC to Phone", true, "Delta Three PC to Phone", "12080", "12080", "UDP", "", "12080", "12080");
        virtual_server[25].entry[3] = new ObjVirtualServer("Delta Three PC to Phone", true, "Delta Three PC to Phone", "12120", "12120", "UDP", "", "12120", "12120"); 
        virtual_server[25].entry[4] = new ObjVirtualServer("Delta Three PC to Phone", true, "Delta Three PC to Phone", "12122", "12122", "UDP", "", "12122", "12122");
        virtual_server[25].entry[5] = new ObjVirtualServer("Delta Three PC to Phone", true, "Delta Three PC to Phone", "24150", "24179", "UDP", "", "24150", "24179");
    virtual_server[26] = new ObjVirServer("Descent 3",3);
        virtual_server[26].entry[0] = new ObjVirtualServer("Descent 3", true, "Descent 3", "7170", "7170", "TCP", "", "7170", "7170");
        virtual_server[26].entry[1] = new ObjVirtualServer("Descent 3", true, "Descent 3", "2092", "2092", "UDP", "", "2092", "2092");
        virtual_server[26].entry[2] = new ObjVirtualServer("Descent 3", true, "Descent 3", "3445", "3445", "UDP", "", "3445", "3445");
    virtual_server[27] = new ObjVirServer("Descent Freespace",5);
        virtual_server[27].entry[0] = new ObjVirtualServer("Descent Freespace", true, "Descent Freespace", "3999", "3999", "TCP", "", "3999", "3999");
        virtual_server[27].entry[1] = new ObjVirtualServer("Descent Freespace", true, "Descent Freespace", "4000", "4000", "UDP", "", "4000", "4000");
        virtual_server[27].entry[2] = new ObjVirtualServer("Descent Freespace", true, "Descent Freespace", "7000", "7000", "UDP", "", "7000", "7000");
        virtual_server[27].entry[3] = new ObjVirtualServer("Descent Freespace", true, "Descent Freespace", "3493", "3493", "UDP", "", "3493", "3493"); 
        virtual_server[27].entry[4] = new ObjVirtualServer("Descent Freespace", true, "Descent Freespace", "3440", "3440", "UDP", "", "3440", "3440");
    virtual_server[28] = new ObjVirServer("Diablo (1.07+)",1);
        virtual_server[28].entry[0] = new ObjVirtualServer("Diablo (1.07+)", true, "Diablo (1.07+)", "6112", "6112", "TCP", "", "6112", "6112");
    virtual_server[29] = new ObjVirServer("Diablo I",1);
        virtual_server[29].entry[0] = new ObjVirtualServer("Diablo I", true, "Diablo I", "6112", "6112", "BOTH", "", "6112", "6112");
    virtual_server[30] = new ObjVirServer("Diablo II",2);
        virtual_server[30].entry[0] = new ObjVirtualServer("Diablo II", true, "Diablo II", "4000", "4000", "TCP", "", "4000", "4000");
        virtual_server[30].entry[1] = new ObjVirtualServer("Diablo II", true, "Diablo II", "6112", "6119", "UDP", "", "6112", "6119");
    virtual_server[31] = new ObjVirServer("DialPad.Com",5);
        virtual_server[31].entry[0] = new ObjVirtualServer("DialPad.Com", true, "DialPad.Com", "51200", "51201", "UDP", "", "51200", "51201");
        virtual_server[31].entry[1] = new ObjVirtualServer("DialPad.Com", true, "DialPad.Com", "7175", "7175", "TCP", "", "7175", "7175");
        virtual_server[31].entry[2] = new ObjVirtualServer("DialPad.Com", true, "DialPad.Com", "51210", "51210", "TCP", "", "51210", "51210");
        virtual_server[31].entry[3] = new ObjVirtualServer("DialPad.Com", true, "DialPad.Com", "8680", "8686", "TCP", "", "8680", "8686"); 
        virtual_server[31].entry[4] = new ObjVirtualServer("DialPad.Com", true, "DialPad.Com", "1584", "1585", "TCP", "", "1584", "1585");
    virtual_server[32] = new ObjVirServer("DirectX 7 Games",2);
        virtual_server[32].entry[0] = new ObjVirtualServer("DirectX 7 Games", true, "DirectX 7 Games", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[32].entry[1] = new ObjVirtualServer("DirectX 7 Games", true, "DirectX 7 Games", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[33] = new ObjVirServer("DirectX 8 Games",2);
        virtual_server[33].entry[0] = new ObjVirtualServer("DirectX 8 Games", true, "DirectX 8 Games", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[33].entry[1] = new ObjVirtualServer("DirectX 8 Games", true, "DirectX 8 Games", "2300", "2400", "UDP", "", "2300", "2400");
    virtual_server[34] = new ObjVirServer("Domain Name Server (DNS)",1);
        virtual_server[34].entry[0] = new ObjVirtualServer("Domain Name Server (DNS)", true, "Domain Name Server (DNS)", "53", "53", "BOTH", "", "53", "53");
    virtual_server[35] = new ObjVirServer("Doom",1);
        virtual_server[35].entry[0] = new ObjVirtualServer("Doom", true, "Doom", "666", "666", "BOTH", "", "666", "666");
    virtual_server[36] = new ObjVirServer("Dune 2000",2);
        virtual_server[36].entry[0] = new ObjVirtualServer("Dune 2000", true, "Dune 2000", "4000", "4000", "TCP", "", "4000", "4000");
        virtual_server[36].entry[1] = new ObjVirtualServer("Dune 2000", true, "Dune 2000", "1140", "1234", "UDP", "", "1140", "1234");
    virtual_server[37] = new ObjVirServer("Dwyco Video Conferencing",4);
        virtual_server[37].entry[0] = new ObjVirtualServer("Dwyco Video Conferencing", true, "Dwyco Video Conferencing", "12000", "16090", "UDP", "", "12000", "16090");
        virtual_server[37].entry[1] = new ObjVirtualServer("Dwyco Video Conferencing", true, "Dwyco Video Conferencing", "1024", "5000", "TCP", "", "1024", "5000");
        virtual_server[37].entry[2] = new ObjVirtualServer("Dwyco Video Conferencing", true, "Dwyco Video Conferencing", "6700", "6702", "TCP", "", "6700", "6702");
        virtual_server[37].entry[3] = new ObjVirtualServer("Dwyco Video Conferencing", true, "Dwyco Video Conferencing", "6880", "6880", "TCP", "", "6880", "6880");
    virtual_server[38] = new ObjVirServer("Elite Force",4);
        virtual_server[38].entry[0] = new ObjVirtualServer("Elite Force", true, "Elite Force", "26000", "26000", "UDP", "", "26000", "26000");
        virtual_server[38].entry[1] = new ObjVirtualServer("Elite Force", true, "Elite Force", "27500", "27500", "UDP", "", "27500", "27500");
        virtual_server[38].entry[2] = new ObjVirtualServer("Elite Force", true, "Elite Force", "27910", "27910", "UDP", "", "27910", "27910");
        virtual_server[38].entry[3] = new ObjVirtualServer("Elite Force", true, "Elite Force", "27960", "27960", "UDP", "", "27960", "27960");
    virtual_server[39] = new ObjVirServer("Everquest",2);
        virtual_server[39].entry[0] = new ObjVirtualServer("Everquest", true, "Everquest", "1024", "6000", "BOTH", "", "1024", "6000");
        virtual_server[39].entry[1] = new ObjVirtualServer("Everquest", true, "Everquest", "6001", "7000", "TCP", "", "6001", "7000");
    virtual_server[40] = new ObjVirServer("F-16",1);
        virtual_server[40].entry[0] = new ObjVirtualServer("F-16", true, "F-16", "3862", "3863", "UDP", "", "3862", "3863");
    virtual_server[41] = new ObjVirServer("F-22 Lightning 3",3);
        virtual_server[41].entry[0] = new ObjVirtualServer("F-22 Lightning 3", true, "F-22 Lightning 3", "3875", "3875", "UDP", "", "3875", "3875");
        virtual_server[41].entry[1] = new ObjVirtualServer("F-22 Lightning 3", true, "F-22 Lightning 3", "4533", "4534", "UDP", "", "4533", "4534");
        virtual_server[41].entry[2] = new ObjVirtualServer("F-22 Lightning 3", true, "F-22 Lightning 3", "4660", "4670", "UDP", "", "4660", "4670");
    virtual_server[42] = new ObjVirServer("F-22 Raptor",1);
        virtual_server[42].entry[0] = new ObjVirtualServer("F-22 Raptor", true, "F-22 Raptor", "3874", "3875", "UDP", "", "3874", "3875");
    virtual_server[43] = new ObjVirServer("F22 Raptor (Novalogic)",1);
        virtual_server[43].entry[0] = new ObjVirtualServer("F22 Raptor (Novalogic)", true, "F22 Raptor (Novalogic)", "3874", "3874", "UDP", "", "3874", "3874");
    virtual_server[44] = new ObjVirServer("Falcon 4.0",1);
        virtual_server[44].entry[0] = new ObjVirtualServer("Falcon 4.0", true, "Falcon 4.0", "2934", "2935", "UDP", "", "2934", "2935");
    virtual_server[45] = new ObjVirServer("Fighter Ace II",4);
        virtual_server[45].entry[0] = new ObjVirtualServer("Fighter Ace II", true, "Fighter Ace II", "50000", "50100", "BOTH", "", "50000", "50100");
        virtual_server[45].entry[1] = new ObjVirtualServer("Fighter Ace II", true, "Fighter Ace II", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[45].entry[2] = new ObjVirtualServer("Fighter Ace II", true, "Fighter Ace II", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[45].entry[3] = new ObjVirtualServer("Fighter Ace II", true, "Fighter Ace II", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[46] = new ObjVirServer("Flight Simulator 2000",3);
        virtual_server[46].entry[0] = new ObjVirtualServer("Flight Simulator 2000", true, "Flight Simulator 2000", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[46].entry[1] = new ObjVirtualServer("Flight Simulator 2000", true, "Flight Simulator 2000", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[46].entry[2] = new ObjVirtualServer("Flight Simulator 2000", true, "Flight Simulator 2000", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[47] = new ObjVirServer("Flight Simulator 98",3);
        virtual_server[47].entry[0] = new ObjVirtualServer("Flight Simulator 98", true, "Flight Simulator 98", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[47].entry[1] = new ObjVirtualServer("Flight Simulator 98", true, "Flight Simulator 98", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[47].entry[2] = new ObjVirtualServer("Flight Simulator 98", true, "Flight Simulator 98", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[48] = new ObjVirServer("Freetel",1);
        virtual_server[48].entry[0] = new ObjVirtualServer("Freetel", true, "Freetel", "21300", "21303", "UDP", "", "21300", "21303");
    virtual_server[49] = new ObjVirServer("FTP Server",1);
        virtual_server[49].entry[0] = new ObjVirtualServer("FTP Server", true, "FTP Server", "21", "21", "TCP", "", "21", "21");
    virtual_server[50] = new ObjVirServer("GNUtella",1);
        virtual_server[50].entry[0] = new ObjVirtualServer("GNUtella", true, "GNUtella", "6346", "6347", "BOTH", "", "6346", "6347");
    virtual_server[51] = new ObjVirServer("Golf 1998 Edition",3);
        virtual_server[51].entry[0] = new ObjVirtualServer("Golf 1998 Edition", true, "Golf 1998 Edition", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[51].entry[1] = new ObjVirtualServer("Golf 1998 Edition", true, "Golf 1998 Edition", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[51].entry[2] = new ObjVirtualServer("Golf 1998 Edition", true, "Golf 1998 Edition", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[52] = new ObjVirServer("Golf 1999 Edition",3);
        virtual_server[52].entry[0] = new ObjVirtualServer("Golf 1999 Edition", true, "Golf 1999 Edition", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[52].entry[1] = new ObjVirtualServer("Golf 1999 Edition", true, "Golf 1999 Edition", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[52].entry[2] = new ObjVirtualServer("Golf 1999 Edition", true, "Golf 1999 Edition", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[53] = new ObjVirServer("Golf 2001 Edition",3);
        virtual_server[53].entry[0] = new ObjVirtualServer("Golf 2001 Edition", true, "Golf 2001 Edition", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[53].entry[1] = new ObjVirtualServer("Golf 2001 Edition", true, "Golf 2001 Edition", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[53].entry[2] = new ObjVirtualServer("Golf 2001 Edition", true, "Golf 2001 Edition", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[54] = new ObjVirServer("Go2Call",2);
        virtual_server[54].entry[0] = new ObjVirtualServer("Go2Call", true, "Go2Call", "2090", "2091", "UDP", "", "2090", "2091");
        virtual_server[54].entry[1] = new ObjVirtualServer("Go2Call", true, "Go2Call", "2090", "2090", "TCP", "", "2090", "2090");
    virtual_server[55] = new ObjVirServer("Half Life",4);
        virtual_server[55].entry[0] = new ObjVirtualServer("Half Life", true, "Half Life", "6003", "6003", "BOTH", "", "6003", "6003");
        virtual_server[55].entry[1] = new ObjVirtualServer("Half Life", true, "Half Life", "7001", "7001", "BOTH", "", "7001", "7001");
        virtual_server[55].entry[2] = new ObjVirtualServer("Half Life", true, "Half Life", "27005", "27005", "UDP", "", "27005", "27005");
        virtual_server[55].entry[3] = new ObjVirtualServer("Half Life", true, "Half Life", "27010", "27015", "UDP", "", "27010", "27015");
    virtual_server[56] = new ObjVirServer("Half Life Server",1);
        virtual_server[56].entry[0] = new ObjVirtualServer("Half Life Server", true, "Half Life Server", "27015", "27015", "UDP", "", "27015", "27015");
    virtual_server[57] = new ObjVirServer("Heretic II Server",1);
        virtual_server[57].entry[0] = new ObjVirtualServer("Heretic II Server", true, "Heretic II Server", "28910", "28910", "BOTH", "", "28910", "28910");
    virtual_server[58] = new ObjVirServer("I76",1);
        virtual_server[58].entry[0] = new ObjVirtualServer("I76", true, "I76", "21154", "21156", "UDP", "", "21154", "21156");
    virtual_server[59] = new ObjVirServer("Ivisit",2);
        virtual_server[59].entry[0] = new ObjVirtualServer("Ivisit", true, "Ivisit", "9943", "9943", "UDP", "", "9943", "9943");
        virtual_server[59].entry[1] = new ObjVirtualServer("Ivisit", true, "Ivisit", "56768", "56768", "UDP", "", "56768", "56768");
    virtual_server[60] = new ObjVirServer("IStreamVideo2HP",1);
        virtual_server[60].entry[0] = new ObjVirtualServer("IStreamVideo2HP", true, "IStreamVideo2HP", "8076", "8077", "BOTH", "", "8076", "8077");
    virtual_server[61] = new ObjVirServer("KaZaA",1);
        virtual_server[61].entry[0] = new ObjVirtualServer("KaZaA", true, "KaZaA", "1024", "1024", "TCP", "", "1024", "1024");
    virtual_server[62] = new ObjVirServer("Kohan Immortal Sovereigns",2);
        virtual_server[62].entry[0] = new ObjVirtualServer("Kohan Immortal Sovereigns", true, "Kohan Immortal Sovereigns", "3855", "3855", "BOTH", "", "3855", "3855");
        virtual_server[62].entry[1] = new ObjVirtualServer("Kohan Immortal Sovereigns", true, "Kohan Immortal Sovereigns", "17437", "17437", "BOTH", "", "17437", "17437");
    virtual_server[63] = new ObjVirServer("LapLink Gold",1);
        virtual_server[63].entry[0] = new ObjVirtualServer("LapLink Gold", true, "LapLink Gold", "1547", "1547", "TCP", "", "1547", "1547");
    virtual_server[64] = new ObjVirServer("Links 2001",3);
        virtual_server[64].entry[0] = new ObjVirtualServer("Links 2001", true, "Links 2001", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[64].entry[1] = new ObjVirtualServer("Links 2001", true, "Links 2001", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[64].entry[2] = new ObjVirtualServer("Links 2001", true, "Links 2001", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[65] = new ObjVirServer("Lotus Notes Server",1);
        virtual_server[65].entry[0] = new ObjVirtualServer("Lotus Notes Server", true, "Lotus Notes Server", "1352", "1352", "TCP", "", "1352", "1352");
    virtual_server[66] = new ObjVirServer("Mail (POP3)",1);
        virtual_server[66].entry[0] = new ObjVirtualServer("Mail (POP3)", true, "Mail (POP3)", "110", "110", "TCP", "", "110", "110");
    virtual_server[67] = new ObjVirServer("Mail (SMTP)",1);
        virtual_server[67].entry[0] = new ObjVirtualServer("Mail (SMTP)", true, "Mail (SMTP)", "25", "25", "TCP", "", "25", "25");
    virtual_server[68] = new ObjVirServer("MechCommander 2.0",3);
        virtual_server[68].entry[0] = new ObjVirtualServer("MechCommander 2.0", true, "MechCommander 2.0", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[68].entry[1] = new ObjVirtualServer("MechCommander 2.0", true, "MechCommander 2.0", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[68].entry[2] = new ObjVirtualServer("MechCommander 2.0", true, "MechCommander 2.0", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[69] = new ObjVirServer("MechWarrior 3",1);
        virtual_server[69].entry[0] = new ObjVirtualServer("MechWarrior 3", true, "MechWarrior 3", "47624", "47624", "BOTH", "", "47624", "47624");
    virtual_server[70] = new ObjVirServer("MechWarrior 4",3);
        virtual_server[70].entry[0] = new ObjVirtualServer("MechWarrior 4", true, "MechWarrior 4", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[70].entry[1] = new ObjVirtualServer("MechWarrior 4", true, "MechWarrior 4", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[70].entry[2] = new ObjVirtualServer("MechWarrior 4", true, "MechWarrior 4", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[71] = new ObjVirServer("Media Player 7",2);
        virtual_server[71].entry[0] = new ObjVirtualServer("Media Player 7", true, "Media Player 7", "1755", "1755", "TCP", "", "1755", "1755");
        virtual_server[71].entry[1] = new ObjVirtualServer("Media Player 7", true, "Media Player 7", "70", "7000", "UDP", "", "70", "7000");
    virtual_server[72] = new ObjVirServer("Midtown Madness",1);
        virtual_server[72].entry[0] = new ObjVirtualServer("Midtown Madness", true, "Midtown Madness", "47624", "47624", "BOTH", "", "47624", "47624");
    virtual_server[73] = new ObjVirServer("Midtown Madness 2",3);
        virtual_server[73].entry[0] = new ObjVirtualServer("Midtown Madness 2", true, "Midtown Madness 2", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[73].entry[1] = new ObjVirtualServer("Midtown Madness 2", true, "Midtown Madness 2", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[73].entry[2] = new ObjVirtualServer("Midtown Madness 2", true, "Midtown Madness 2", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[74] = new ObjVirServer("Mig 29",1);
        virtual_server[74].entry[0] = new ObjVirtualServer("Mig 29", true, "Mig 29", "3862", "3863", "UDP", "", "3862", "3863");
    virtual_server[75] = new ObjVirServer("Monster Truck Madness",3);
        virtual_server[75].entry[0] = new ObjVirtualServer("Monster Truck Madness", true, "Monster Truck Madness", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[75].entry[1] = new ObjVirtualServer("Monster Truck Madness", true, "Monster Truck Madness", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[75].entry[2] = new ObjVirtualServer("Monster Truck Madness", true, "Monster Truck Madness", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[76] = new ObjVirServer("Monster Truck Madness 2",3);
        virtual_server[76].entry[0] = new ObjVirtualServer("Monster Truck Madness 2", true, "Monster Truck Madness 2", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[76].entry[1] = new ObjVirtualServer("Monster Truck Madness 2", true, "Monster Truck Madness 2", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[76].entry[2] = new ObjVirtualServer("Monster Truck Madness 2", true, "Monster Truck Madness 2", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[77] = new ObjVirServer("Motocross Madness",3);
        virtual_server[77].entry[0] = new ObjVirtualServer("Motocross Madness", true, "Motocross Madness", "47624", "47624", "BOTH", "", "47624", "47624");
        virtual_server[77].entry[1] = new ObjVirtualServer("Motocross Madness", true, "Motocross Madness", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[77].entry[2] = new ObjVirtualServer("Motocross Madness", true, "Motocross Madness", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[78] = new ObjVirServer("Motocross Madness 2",3);   
        virtual_server[78].entry[0] = new ObjVirtualServer("Motocross Madness 2", true, "Motocross Madness 2", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[78].entry[1] = new ObjVirtualServer("Motocross Madness 2", true, "Motocross Madness 2", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[78].entry[2] = new ObjVirtualServer("Motocross Madness 2", true, "Motocross Madness 2", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[79] = new ObjVirServer("Motorhead Server",1);   
        virtual_server[79].entry[0] = new ObjVirtualServer("Motorhead Server", true, "Motorhead Server", "16000", "16000", "BOTH", "", "16000", "16000");
    virtual_server[80] = new ObjVirServer("Myth",1);
        virtual_server[80].entry[0] = new ObjVirtualServer("Myth", true, "Myth", "3453", "3453", "TCP", "", "3453", "3453");
    virtual_server[81] = new ObjVirServer("Myth II Server",1);
        virtual_server[81].entry[0] = new ObjVirtualServer("Myth II Server", true, "Myth II Server", "3453", "3453", "TCP", "", "3453", "3453"); 
    virtual_server[82] = new ObjVirServer("Myth: The Fallen Lords",1);
        virtual_server[82].entry[0] = new ObjVirtualServer("Myth: The Fallen Lords", true, "Myth: The Fallen Lords", "3453", "3453", "TCP", "", "3453", "3453");
    virtual_server[83] = new ObjVirServer("Need for Speed",2);
        virtual_server[83].entry[0] = new ObjVirtualServer("Need for Speed", true, "Need for Speed", "9442", "9442", "TCP", "", "9442", "9442"); 
        virtual_server[83].entry[1] = new ObjVirtualServer("Need for Speed", true, "Need for Speed", "6112", "6112", "UDP", "", "6112", "6112"); 
    virtual_server[84] = new ObjVirServer("NetMech",1);
        virtual_server[84].entry[0] = new ObjVirtualServer("NetMech", true, "NetMech", "21154", "21156", "UDP", "", "21154", "21156"); 
    virtual_server[85] = new ObjVirServer("Network Time Protocol (NTP)",1);
        virtual_server[85].entry[0] = new ObjVirtualServer("Network Time Protocol (NTP)", true, "Network Time Protocol (NTP)", "123", "123", "UDP", "", "123", "123"); 
    virtual_server[86] = new ObjVirServer("News Server (NNTP)",1);
        virtual_server[86].entry[0] = new ObjVirtualServer("News Server (NNTP)", true, "News Server (NNTP)", "119", "119", "TCP", "", "119", "119");
    virtual_server[87] = new ObjVirServer("OKWeb",3);
        virtual_server[87].entry[0] = new ObjVirtualServer("OKWeb", true, "OKWeb", "80", "80", "TCP", "", "80", "80"); 
        virtual_server[87].entry[1] = new ObjVirtualServer("OKWeb", true, "OKWeb", "443", "443", "TCP", "", "443", "443");
        virtual_server[87].entry[2] = new ObjVirtualServer("OKWeb", true, "OKWeb", "5210", "5220", "TCP", "", "5210", "5220");
    virtual_server[88] = new ObjVirServer("OKWin",3);
        virtual_server[88].entry[0] = new ObjVirtualServer("OKWin", true, "OKWin", "1729", "1729", "TCP", "", "1729", "1729"); 
        virtual_server[88].entry[1] = new ObjVirtualServer("OKWin", true, "OKWin", "1909", "1909", "TCP", "", "1909", "1909");
        virtual_server[88].entry[2] = new ObjVirtualServer("OKWin", true, "OKWin", "80", "80", "TCP", "", "80", "80");
    virtual_server[89] = new ObjVirServer("Outlaws",1);
        virtual_server[89].entry[0] = new ObjVirtualServer("Outlaws", true, "Outlaws", "5310", "5310", "BOTH", "", "5310", "5310"); 
    virtual_server[90] = new ObjVirServer("pcAnywhere v7.5",1);
        virtual_server[90].entry[0] = new ObjVirtualServer("pcAnywhere v7.5", true, "pcAnywhere v7.5", "5631", "5631", "BOTH", "", "5631", "5631"); 
    virtual_server[91] = new ObjVirServer("PhoneFree",4);
        virtual_server[91].entry[0] = new ObjVirtualServer("PhoneFree", true, "PhoneFree", "1034", "1035", "BOTH", "", "1034", "1035"); 
        virtual_server[91].entry[1] = new ObjVirtualServer("PhoneFree", true, "PhoneFree", "9900", "9901", "UDP", "", "9900", "9901"); 
        virtual_server[91].entry[2] = new ObjVirtualServer("PhoneFree", true, "PhoneFree", "2644", "2644", "TCP", "", "2644", "2644");
        virtual_server[91].entry[3] = new ObjVirtualServer("PhoneFree", true, "PhoneFree", "8000", "8000", "TCP", "", "8000", "8000");
    virtual_server[92] = new ObjVirServer("Polycom ViaVideo H.323",1);
        virtual_server[92].entry[0] = new ObjVirtualServer("Polycom ViaVideo H.323", true, "Polycom ViaVideo H.323", "3230", "3235", "TCP", "", "3230", "3235");
    virtual_server[93] = new ObjVirServer("Polycom ViaVideo H.324",1);
        virtual_server[93].entry[0] = new ObjVirtualServer("Polycom ViaVideo H.324", true, "Polycom ViaVideo H.324", "3230", "3235", "UDP", "", "3230", "3235");
    virtual_server[94] = new ObjVirServer("Quake",1);
        virtual_server[94].entry[0] = new ObjVirtualServer("Quake", true, "Quake", "26000", "26000", "BOTH", "", "26000", "26000");
    virtual_server[95] = new ObjVirServer("Quake II (Client and Server)",1);
        virtual_server[95].entry[0] = new ObjVirtualServer("Quake II (Client and Server)", true, "Quake II (Client and Server)", "27910", "27910", "UDP", "", "27910", "27910");
    virtual_server[96] = new ObjVirServer("Quake III",1);
        virtual_server[96].entry[0] = new ObjVirtualServer("Quake III", true, "Quake III", "27660", "27680", "UDP", "", "27660", "27680");
    virtual_server[97] = new ObjVirServer("Red Alert",1);
        virtual_server[97].entry[0] = new ObjVirtualServer("Red Alert", true, "Red Alert", "5009", "5009", "UDP", "", "5009", "5009");
    virtual_server[98] = new ObjVirServer("Rise of Rome",1);
        virtual_server[98].entry[0] = new ObjVirtualServer("Rise of Rome", true, "Rise of Rome", "47624", "47624", "BOTH", "", "47624", "47624");
    virtual_server[99] = new ObjVirServer("Roger Wilco",2);
        virtual_server[99].entry[0] = new ObjVirtualServer("Roger Wilco", true, "Roger Wilco", "3782", "3782", "TCP", "", "3782", "3782");
        virtual_server[99].entry[1] = new ObjVirtualServer("Roger Wilco", true, "Roger Wilco", "3782", "3783", "UDP", "", "3782", "3783"); 
    virtual_server[100] = new ObjVirServer("Rogue Spear",1);
        virtual_server[100].entry[0] = new ObjVirtualServer("Rogue Spear", true, "Rogue Spear", "2346", "2346", "TCP", "", "2346", "2346"); 
    virtual_server[101] = new ObjVirServer("Secure Shell Server (SSH)",1);
        virtual_server[101].entry[0] = new ObjVirtualServer("Secure Shell Server (SSH)", true, "Secure Shell Server (SSH)", "22", "22", "TCP", "", "22", "22");
    virtual_server[102] = new ObjVirServer("Secure Web Server (HTTPS)",1);
        virtual_server[102].entry[0] = new ObjVirtualServer("Secure Web Server (HTTPS)", true, "Secure Web Server (HTTPS)", "443", "443", "TCP", "", "443", "443");
    virtual_server[103] = new ObjVirServer("ShoutCast",1);
        virtual_server[103].entry[0] = new ObjVirtualServer("ShoutCast", true, "ShoutCast", "8000", "8005", "TCP", "", "8000", "8005");
    virtual_server[104] = new ObjVirServer("SNMP",1);
        virtual_server[104].entry[0] = new ObjVirtualServer("SNMP", true, "SNMP", "161", "161", "UDP", "", "161", "161");
    virtual_server[105] = new ObjVirServer("SNMP Trap",1);
        virtual_server[105].entry[0] = new ObjVirtualServer("SNMP Trap", true, "SNMP Trap", "162", "162", "UDP", "", "162", "162");
    virtual_server[106] = new ObjVirServer("Speak Freely",1);
        virtual_server[106].entry[0] = new ObjVirtualServer("Speak Freely", true, "Speak Freely", "2074", "2076", "UDP", "", "2074", "2076");
    virtual_server[107] = new ObjVirServer("Starfleet Command",3);   
        virtual_server[107].entry[0] = new ObjVirtualServer("Starfleet Command", true, "Starfleet Command", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[107].entry[1] = new ObjVirtualServer("Starfleet Command", true, "Starfleet Command", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[107].entry[2] = new ObjVirtualServer("Starfleet Command", true, "Starfleet Command", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[108] = new ObjVirServer("StarLancer",3);   
        virtual_server[108].entry[0] = new ObjVirtualServer("StarLancer", true, "StarLancer", "47624", "47624", "TCP", "", "47624", "47624");
        virtual_server[108].entry[1] = new ObjVirtualServer("StarLancer", true, "StarLancer", "6073", "6073", "TCP", "", "6073", "6073");
        virtual_server[108].entry[2] = new ObjVirtualServer("StarLancer", true, "StarLancer", "2300", "2400", "BOTH", "", "2300", "2400");
    virtual_server[109] = new ObjVirServer("SWAT3",2);   
        virtual_server[109].entry[0] = new ObjVirtualServer("SWAT3", true, "SWAT3", "16639", "16639", "TCP", "", "16639", "16639");
        virtual_server[109].entry[1] = new ObjVirtualServer("SWAT3", true, "SWAT3", "16638", "16638", "UDP", "", "16638", "16638");
    virtual_server[110] = new ObjVirServer("Telnet Server",1);   
        virtual_server[110].entry[0] = new ObjVirtualServer("Telnet Server", true, "Telnet Server", "23", "23", "TCP", "", "23", "23");
    virtual_server[111] = new ObjVirServer("The 4th Coming",2);   
        virtual_server[111].entry[0] = new ObjVirtualServer("The 4th Coming", true, "The 4th Coming", "11677", "11677", "UDP", "", "11677", "11677");
        virtual_server[111].entry[1] = new ObjVirtualServer("The 4th Coming", true, "The 4th Coming", "11679", "11679", "UDP", "", "11679", "11679");
    virtual_server[112] = new ObjVirServer("Tiberian Sun: C&C",2);   
        virtual_server[112].entry[0] = new ObjVirtualServer("Tiberian Sun: C&C", true, "Tiberian Sun: C&C", "4000", "4000", "TCP", "", "4000", "4000");
        virtual_server[112].entry[1] = new ObjVirtualServer("Tiberian Sun: C&C", true, "Tiberian Sun: C&C", "1140", "1234", "UDP", "", "1140", "1234");
    virtual_server[113] = new ObjVirServer("Tiberian Sun: C&C III",1);   
        virtual_server[113].entry[0] = new ObjVirtualServer("Tiberian Sun: C&C III", true, "Tiberian Sun: C&C III", "1234", "1234", "UDP", "", "1234", "1234");
    virtual_server[114] = new ObjVirServer("Total Annihilation",1);   
        virtual_server[114].entry[0] = new ObjVirtualServer("Total Annihilation", true, "Total Annihilation", "47624", "47624", "UDP", "", "47624", "47624"); 
    virtual_server[115] = new ObjVirServer("Ultima",5);
        virtual_server[115].entry[0] = new ObjVirtualServer("Ultima", true, "Ultima", "5001", "5010", "TCP", "", "5001", "5010"); 
        virtual_server[115].entry[1] = new ObjVirtualServer("Ultima", true, "Ultima", "7775", "7777", "TCP", "", "7775", "7777"); 
        virtual_server[115].entry[2] = new ObjVirtualServer("Ultima", true, "Ultima", "8800", "8900", "TCP", "", "8800", "8900"); 
        virtual_server[115].entry[3] = new ObjVirtualServer("Ultima", true, "Ultima", "9999", "9999", "TCP", "", "9999", "9999");
        virtual_server[115].entry[4] = new ObjVirtualServer("Ultima", true, "Ultima", "7875", "7875", "TCP", "", "7875", "7875"); 
    virtual_server[116] = new ObjVirServer("Unreal Tournament",3);
        virtual_server[116].entry[0] = new ObjVirtualServer("Unreal Tournament", true, "Unreal Tournament", "7777", "7790", "UDP", "", "7777", "7790"); 
        virtual_server[116].entry[1] = new ObjVirtualServer("Unreal Tournament", true, "Unreal Tournament", "27900", "27900", "UDP", "", "27900", "27900"); 
        virtual_server[116].entry[2] = new ObjVirtualServer("Unreal Tournament", true, "Unreal Tournament", "8080", "8080", "TCP", "", "8080", "8080");
    virtual_server[117] = new ObjVirServer("Urban Assault",3);
        virtual_server[117].entry[0] = new ObjVirtualServer("Urban Assault", true, "Urban Assault", "47624", "47624", "TCP", "", "47624", "47624"); 
        virtual_server[117].entry[1] = new ObjVirtualServer("Urban Assault", true, "Urban Assault", "6073", "6073", "TCP", "", "6073", "6073"); 
        virtual_server[117].entry[2] = new ObjVirtualServer("Urban Assault", true, "Urban Assault", "2300", "2400", "BOTH", "", "2300", "2400"); 
    virtual_server[118] = new ObjVirServer("VoxPhone 3.0",1);
        virtual_server[118].entry[0] = new ObjVirtualServer("VoxPhone 3.0", true, "VoxPhone 3.0", "12380", "12380", "BOTH", "", "12380", "12380"); 
    virtual_server[119] = new ObjVirServer("Warbirds 2",1);
        virtual_server[119].entry[0] = new ObjVirtualServer("Warbirds 2", true, "Warbirds 2", "912", "912", "TCP", "", "912", "912");
    virtual_server[120] = new ObjVirServer("Web Server (HTTP)",1);
        virtual_server[120].entry[0] = new ObjVirtualServer("Web Server (HTTP)", true, "Web Server (HTTP)", "80", "80", "TCP", "", "80", "80");
    virtual_server[121] = new ObjVirServer("WebPhone 3.0",1);
        virtual_server[121].entry[0] = new ObjVirtualServer("WebPhone 3.0", true, "WebPhone 3.0", "21845", "21845", "TCP", "", "21845", "21845");
    virtual_server[122] = new ObjVirServer("Windows 2000 Terminal Server",1);
        virtual_server[122].entry[0] = new ObjVirtualServer("Windows 2000 Terminal Server", true, "Windows 2000 Terminal Server", "3389", "3389", "BOTH", "", "3389", "3389"); 
    virtual_server[123] = new ObjVirServer("X Windows",1);
        virtual_server[123].entry[0] = new ObjVirtualServer("X Windows", true, "X Windows", "6000", "6000", "BOTH", "", "6000", "6000"); 
    virtual_server[124] = new ObjVirServer("Yahoo Pager",1);
        virtual_server[124].entry[0] = new ObjVirtualServer("Yahoo Pager", true, "Yahoo Pager", "5050", "5050", "TCP", "", "5050", "5050");
    virtual_server[125] = new ObjVirServer("Pal Talk",3);
        virtual_server[125].entry[0] = new ObjVirtualServer("Pal Talk", true, "Pal Talk", "2090", "2090", "BOTH", "", "2090", "2090"); 
        virtual_server[125].entry[1] = new ObjVirtualServer("Pal Talk", true, "Pal Talk", "2091", "2091", "BOTH", "", "2091", "2091");
        virtual_server[125].entry[2] = new ObjVirtualServer("Pal Talk", true, "Pal Talk", "2095", "2095", "TCP", "", "2095", "2095");
    virtual_server[126] = new ObjVirServer("Real Player 8 Plus",1);
        virtual_server[126].entry[0] = new ObjVirtualServer("Real Player 8 Plus", true, "Real Player 8 Plus", "7070", "7070", "UDP", "", "7070", "7070");
    virtual_server[127] = new ObjVirServer("RealAudio",1);
        virtual_server[127].entry[0] = new ObjVirtualServer("RealAudio", true, "RealAudio", "6790", "32000", "UDP", "", "6790", "32000");
    virtual_server[128] = new ObjVirServer("Westwood Online",2);
        virtual_server[128].entry[0] = new ObjVirtualServer("Westwood Online", true, "Westwood Online", "4000", "4000", "UDP", "", "4000", "4000"); 
        virtual_server[128].entry[1] = new ObjVirtualServer("Westwood Online", true, "Westwood Online", "1140", "1234", "BOTH", "", "1140", "1234");
	
        
function emptyentry(count)
{
    	if((eval('document.tF0.description_'+count).value == '')
    		&&(eval('document.tF0.inbound_port_low_'+count).value == '')
    		&&(eval('document.tF0.inbound_port_high_'+count).value == '')
    		&&(eval('document.tF0.private_ip_'+count).value == '')
    		&&(eval('document.tF0.private_port_low_'+count).value == '')
    		&&(eval('document.tF0.private_port_high_'+count).value == ''))
    		return true;
    	else 
    		return false;
}

function GetEmptyEntry()
{
	var ret_entry=0;
	var count=0;
	var i=1;
	for (i=1;i<21;i++)
	{
		count=i;
		count=count+'';
		if(emptyentry(count))
		{
			ret_entry=i;
			return ret_entry;
		}
	}
    	alert(ENTRY_FULL);
    	return ret_entry;
}

function EntryCount()
{
	var ret_entry = 0;
	var count = 0;
	var i = 1;
	
	for (i = 1; i < 21; i++)
	{
		count = i;
		count = count+'';
		
		if(emptyentry(count))
		{
			ret_entry++;
		}
	}
    	return ret_entry;
}

function ObjVirServer(name, entry_num)
{
    this.name		= name;
    this.entry_num	= entry_num;
    this.entry		= new Array(entry_num);
}

function ObjVirtualServer(name, enable, description, inbound_port_low, inbound_port_high,
			  type, private_ip, private_port_low, private_port_high)
{
    this.name			= name;
    this.enable			= enable;
    this.description		= description;
    this.inbound_port_low	= inbound_port_low;
    this.inbound_port_high	= inbound_port_high;
    this.type			= type;
    this.private_ip		= private_ip;
    this.private_port_low	= private_port_low;
    this.private_port_high	= private_port_high;
}

function addvirtsvr(c,i,j)
{
	var count=c;

	count=count+'';
	eval('document.tF0.enable_'+count).checked = virtual_server[i].entry[j].enable;
	
	//virtual_server[i].entry[j].description = virtual_server[i].entry[j].description.replace(/:/g,' ');
        
	eval('document.tF0.description_'+count).value = virtual_server[i].entry[j].description;
	eval('document.tF0.inbound_port_low_'+count).value = virtual_server[i].entry[j].inbound_port_low;
	eval('document.tF0.inbound_port_high_'+count).value = virtual_server[i].entry[j].inbound_port_high;
	if(virtual_server[i].entry[j].type == "TCP")
		eval('document.tF0.type_'+count).options[0].selected = true;
	else if(virtual_server[i].entry[j].type == "UDP")
		eval('document.tF0.type_'+count).options[1].selected = true;
	else
		eval('document.tF0.type_'+count).options[2].selected = true;
		
	eval('document.tF0.private_ip_'+count).value = virtual_server[i].entry[j].private_ip;
	eval('document.tF0.private_port_low_'+count).value = virtual_server[i].entry[j].private_port_low;
	eval('document.tF0.private_port_high_'+count).value = virtual_server[i].entry[j].private_port_high;
}

function AddVirtualServer(server_name)
{
	var i=0; var j=0;
	
	for(i=0; i < virtual_server_MAX_NUM; i++)
	{
		if(virtual_server[i].name == server_name)
		{
			var entry_num = virtual_server[i].entry_num;
			var empty_entry;
			
			empty_entry = EntryCount();
			if(empty_entry < entry_num)
			{
				alert(ENTRY_FULL);
				return;
			}
			for(j = 0; j < entry_num; j++)
			{
				empty_entry = GetEmptyEntry();
				addvirtsvr(empty_entry,i,j);
			}
		}
	}
}

function clearCall(count)
{
	eval('document.tF0.enable_'+count).checked = false;
	eval('document.tF0.description_'+count).value = "";
	eval('document.tF0.inbound_port_low_'+count).value = "";
	eval('document.tF0.inbound_port_high_'+count).value = "";
	eval('document.tF0.type_'+count).options[2].selected = true;
	eval('document.tF0.private_ip_'+count).value = "";
	eval('document.tF0.private_port_low_'+count).value = "";
	eval('document.tF0.private_port_high_'+count).value = "";
}

function ClearEntry(entry)
{
	if(entry=='all')
	{
		if(confirm(CLEAR_ALL_CONFIRM))
		{
			var count=0;
			for(i=1;i<21;i++)
			{
				count=i;
				count=count+'';
				clearCall(count);
			}
		}
	}
	else
		if(confirm(CLEAR_CONFIRM + entry + "?"))
			clearCall(entry);
}
