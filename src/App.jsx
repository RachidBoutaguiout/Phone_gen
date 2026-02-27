import { useState, useMemo } from "react";

// ─── COUNTRY DATA: 150+ COUNTRIES ALL REGIONS ─────────────────────────────────
const COUNTRIES = [
  // ── NORTH AMERICA ──
  { name: "United States", code: "US", region: "North America", dialCode: "+1", services: { mobile: { prefixes: ["201","202","203","205","206","207","208","209","210","212","213","214","215","216","217","218","219","224","225","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","281","301","302","303","304","305","307","309","310","312","313","314","315","316","317","318","319","321","323","325","330","331","334","336","337","346","347","352","360","361","385","386","401","402","404","405","406","407","408","409","410","412","413","414","415","417","419","423","424","425","432","434","435","440","442","443","469","470","475","478","479","480","484","501","502","503","504","505","507","508","510","512","513","515","516","517","518","520","530","539","540","541","551","559","561","562","563","567","570","571","573","574","575","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","628","630","631","636","641","646","650","651","657","660","661","662","667","669","678","681","682","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","727","731","732","734","737","740","754","757","760","762","763","765","769","770","772","773","774","775","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","828","830","831","832","843","845","847","848","850","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","929","930","931","936","937","938","940","941","947","949","951","952","954","956","970","971","972","973","978","979","980","984","985","989"], length: 10, format: "(NXX) NXX-XXXX" }, landline: { prefixes: ["212","213","312","404","415","617","702","713","718","770","858","901","904","949"], length: 10, format: "(NXX) NXX-XXXX" }, toll_free: { prefixes: ["800","844","855","866","877","888"], length: 10, format: "1-8XX-NXX-XXXX" }, premium: { prefixes: ["900"], length: 10, format: "1-900-NXX-XXXX" }, voip: { prefixes: ["203","312","415","512","646","702","720","857"], length: 10, format: "(NXX) NXX-XXXX" }, paging: { prefixes: ["369","638","985"], length: 10, format: "(NXX) NXX-XXXX" } } },
  { name: "Canada", code: "CA", region: "North America", dialCode: "+1", services: { mobile: { prefixes: ["403","416","418","430","431","437","438","450","506","514","519","548","579","581","587","604","613","647","672","705","709","778","780","782","807","819","825","867","873","902","905"], length: 10, format: "(NXX) NXX-XXXX" }, landline: { prefixes: ["416","514","604","780","613","902","709","807"], length: 10, format: "(NXX) NXX-XXXX" }, toll_free: { prefixes: ["800","833","844","855","866","877","888"], length: 10, format: "1-8XX-NXX-XXXX" } } },
  { name: "Mexico", code: "MX", region: "North America", dialCode: "+52", services: { mobile: { prefixes: ["55","33","81","664","665","667","668","669","686","687","688","689","690","691","692","693","694","695","696","697","698","699","700"], length: 10, format: "XX XXXX XXXX" }, landline: { prefixes: ["55","33","81","222","229","271","272","273","274","275","276","277","278","279"], length: 10, format: "XX XXXX XXXX" }, toll_free: { prefixes: ["800","888"], length: 10, format: "800 XXX XXXX" } } },

  // ── LATIN AMERICA & CARIBBEAN ──
  { name: "Brazil", code: "BR", region: "Latin America", dialCode: "+55", services: { mobile: { prefixes: ["119","219","319","419","519","619","719","819","919"], length: 11, format: "(XX) 9XXXX-XXXX" }, landline: { prefixes: ["11","21","31","41","51","61","71","81","91","12","13","14","15","16","17","18","19"], length: 10, format: "(XX) XXXX-XXXX" }, toll_free: { prefixes: ["800"], length: 11, format: "0800 XXX XXXX" }, premium: { prefixes: ["900"], length: 11, format: "0900 XXX XXXX" } } },
  { name: "Argentina", code: "AR", region: "Latin America", dialCode: "+54", services: { mobile: { prefixes: ["911","919","921","929","931","939","941","949","951","959","961","969","971","979","981","989","991","999"], length: 10, format: "0XX 15-XXXX-XXXX" }, landline: { prefixes: ["11","221","223","260","261","264","280","291","294","296","297","299","341","351","381","383","385","387","388","389"], length: 10, format: "0XX XXXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Colombia", code: "CO", region: "Latin America", dialCode: "+57", services: { mobile: { prefixes: ["300","301","302","303","304","305","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","350","351"], length: 10, format: "3XX XXX XXXX" }, landline: { prefixes: ["1","2","4","5","6","7","8"], length: 10, format: "0X XXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "01800 XXX XXXX" } } },
  { name: "Chile", code: "CL", region: "Latin America", dialCode: "+56", services: { mobile: { prefixes: ["9"], length: 9, format: "9 XXXX XXXX" }, landline: { prefixes: ["2","22","32","33","34","35","41","42","43","44","45","51","52","53","55","57","58","61","63","64","65","67","68","71","72","73","75"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" } } },
  { name: "Peru", code: "PE", region: "Latin America", dialCode: "+51", services: { mobile: { prefixes: ["9"], length: 9, format: "9XX XXX XXX" }, landline: { prefixes: ["1","54","64","65","66","67","73","74","75","76","82","83","84"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXX" } } },
  { name: "Venezuela", code: "VE", region: "Latin America", dialCode: "+58", services: { mobile: { prefixes: ["412","414","416","424","426"], length: 10, format: "04XX XXX XXXX" }, landline: { prefixes: ["212","234","240","241","243","244","245","246","248","249","251","252","253","254","255","256","257","258","259","261","263","265","267","268","269","271","272","273","274","275","276","277","278","279","281","282","283","284","285","286","287","288","289","291","292","293","294","295","296"], length: 10, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Ecuador", code: "EC", region: "Latin America", dialCode: "+593", services: { mobile: { prefixes: ["99","98","96","95","94","93","92","91","90"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["2","3","4","5","6","7"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" } } },
  { name: "Bolivia", code: "BO", region: "Latin America", dialCode: "+591", services: { mobile: { prefixes: ["6","7"], length: 8, format: "X XXX XXXX" }, landline: { prefixes: ["2","3","4"], length: 8, format: "0X XXX XXXX" } } },
  { name: "Paraguay", code: "PY", region: "Latin America", dialCode: "+595", services: { mobile: { prefixes: ["961","971","972","973","974","975","976","977","978","979","981","982","983","984","985","986","987","988","989","991","992","993","994","995","996","997","998","999"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["21","22","23","24","25","26","27","28","29","31","32","33","34","35","36","37","38","39","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","77","78","79"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Uruguay", code: "UY", region: "Latin America", dialCode: "+598", services: { mobile: { prefixes: ["091","092","093","094","095","096","097","098","099"], length: 9, format: "09X XXX XXX" }, landline: { prefixes: ["2","43","44","45","46","47","48","49","52","54","55","56","57","58","59","62","63","64","65","66","67","68","69","72","73","74","75","76","77","78","79"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["0800"], length: 9, format: "0800 XXXXX" } } },
  { name: "Cuba", code: "CU", region: "Latin America", dialCode: "+53", services: { mobile: { prefixes: ["5"], length: 8, format: "5 XXX XXXX" }, landline: { prefixes: ["7","22","23","24","31","32","33","41","42","43","45","47","48"], length: 8, format: "0X XXX XXXX" } } },
  { name: "Dominican Republic", code: "DO", region: "Latin America", dialCode: "+1", services: { mobile: { prefixes: ["809","829","849"], length: 10, format: "(8XX) XXX-XXXX" }, landline: { prefixes: ["809"], length: 10, format: "(809) XXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "1-800-XXX-XXXX" } } },
  { name: "Guatemala", code: "GT", region: "Latin America", dialCode: "+502", services: { mobile: { prefixes: ["3","4","5"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2","6","7"], length: 8, format: "XXXX XXXX" } } },
  { name: "Costa Rica", code: "CR", region: "Latin America", dialCode: "+506", services: { mobile: { prefixes: ["5","6","7","8"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Panama", code: "PA", region: "Latin America", dialCode: "+507", services: { mobile: { prefixes: ["6"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2","3","4","5","7","8","9"], length: 8, format: "XXX XXXX" } } },
  { name: "Jamaica", code: "JM", region: "Latin America", dialCode: "+1", services: { mobile: { prefixes: ["876"], length: 10, format: "(876) XXX-XXXX" }, landline: { prefixes: ["876"], length: 10, format: "(876) XXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "1-800-XXX-XXXX" } } },
  { name: "Trinidad and Tobago", code: "TT", region: "Latin America", dialCode: "+1", services: { mobile: { prefixes: ["868"], length: 10, format: "(868) XXX-XXXX" }, landline: { prefixes: ["868"], length: 10, format: "(868) XXX-XXXX" } } },
  { name: "Honduras", code: "HN", region: "Latin America", dialCode: "+504", services: { mobile: { prefixes: ["3","7","8","9"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2"], length: 8, format: "XXXX XXXX" } } },
  { name: "El Salvador", code: "SV", region: "Latin America", dialCode: "+503", services: { mobile: { prefixes: ["6","7"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2"], length: 8, format: "XXXX XXXX" } } },
  { name: "Nicaragua", code: "NI", region: "Latin America", dialCode: "+505", services: { mobile: { prefixes: ["5","6","7","8"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2"], length: 8, format: "XXXX XXXX" } } },

  // ── WESTERN EUROPE ──
  { name: "United Kingdom", code: "GB", region: "Western Europe", dialCode: "+44", services: { mobile: { prefixes: ["7400","7500","7600","7700","7800","7900","7450","7550","7650","7750","7850","7950"], length: 10, format: "07XXX XXXXXX" }, landline: { prefixes: ["20","121","131","141","151","161","113","114","115","116","117","118"], length: 10, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800","808"], length: 10, format: "0800 XXX XXXX" }, premium: { prefixes: ["906","909","982","983"], length: 10, format: "09XX XXX XXXX" }, voip: { prefixes: ["56","30"], length: 10, format: "056 XXXX XXXX" }, paging: { prefixes: ["76"], length: 10, format: "076X XXXXXX" } } },
  { name: "France", code: "FR", region: "Western Europe", dialCode: "+33", services: { mobile: { prefixes: ["6","7"], length: 9, format: "0X XX XX XX XX" }, landline: { prefixes: ["1","2","3","4","5"], length: 9, format: "0X XX XX XX XX" }, toll_free: { prefixes: ["800","805","809"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["892","899"], length: 9, format: "089X XX XX XX" }, voip: { prefixes: ["9"], length: 9, format: "09 XX XX XX XX" } } },
  { name: "Germany", code: "DE", region: "Western Europe", dialCode: "+49", services: { mobile: { prefixes: ["15","16","17"], length: 11, format: "0XXX XXXXXXXX" }, landline: { prefixes: ["30","40","69","89","211","221","231","341","351","511","621","711"], length: 11, format: "0XXX XXXXXXXX" }, toll_free: { prefixes: ["800"], length: 11, format: "0800 XXXXXXX" }, premium: { prefixes: ["900","901"], length: 11, format: "0900 XXXXXXX" }, voip: { prefixes: ["32"], length: 11, format: "032X XXXXXXXX" } } },
  { name: "Spain", code: "ES", region: "Western Europe", dialCode: "+34", services: { mobile: { prefixes: ["6","7"], length: 9, format: "XXX XXX XXX" }, landline: { prefixes: ["91","93","94","95","96","971","972","973","974","975","976","977","978","979","980","981","982","983","984","985","986","987","988","989"], length: 9, format: "XXX XXX XXX" }, toll_free: { prefixes: ["800","900"], length: 9, format: "900 XXX XXX" }, premium: { prefixes: ["803","806","807","905","907"], length: 9, format: "90X XXX XXX" }, voip: { prefixes: ["51","52","53","54","55","56","57","58","59"], length: 9, format: "5XX XXX XXX" } } },
  { name: "Italy", code: "IT", region: "Western Europe", dialCode: "+39", services: { mobile: { prefixes: ["3"], length: 10, format: "3XX XXX XXXX" }, landline: { prefixes: ["02","06","011","041","051","055","081","091"], length: 9, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800","803"], length: 9, format: "800 XXXXXX" }, premium: { prefixes: ["899","166"], length: 9, format: "899 XXXXXX" }, voip: { prefixes: ["178","179"], length: 9, format: "178 XXXXXX" } } },
  { name: "Netherlands", code: "NL", region: "Western Europe", dialCode: "+31", services: { mobile: { prefixes: ["6"], length: 9, format: "06 XXXX XXXX" }, landline: { prefixes: ["10","20","30","40","50","70","75","76","77","78","79","88"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXXX" }, premium: { prefixes: ["900","906","909"], length: 9, format: "0900 XXXXXXX" }, voip: { prefixes: ["85","87"], length: 9, format: "085 XXX XXXX" } } },
  { name: "Belgium", code: "BE", region: "Western Europe", dialCode: "+32", services: { mobile: { prefixes: ["456","460","465","470","475","477","478","479","480","484","485","486","487","488","489","490","491","492","493","494","495","496","497","498","499"], length: 9, format: "04XX XX XX XX" }, landline: { prefixes: ["2","3","4","9","10","11","12","13","14","15","16","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","67","68","69","71","80","81","82","83","84","85","86","87","89"], length: 9, format: "0XX XX XX XX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XX XXX" }, premium: { prefixes: ["900","902","905","906","909"], length: 9, format: "0900 XX XXX" } } },
  { name: "Sweden", code: "SE", region: "Western Europe", dialCode: "+46", services: { mobile: { prefixes: ["70","72","73","76","79"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["8","11","13","16","18","19","21","23","26","31","33","35","36","40","42","44","46","54","60","63","90"], length: 9, format: "0XX XX XX XX" }, toll_free: { prefixes: ["20"], length: 9, format: "020 XX XX XX" }, premium: { prefixes: ["900","939","944"], length: 9, format: "0900 XX XXX" } } },
  { name: "Norway", code: "NO", region: "Western Europe", dialCode: "+47", services: { mobile: { prefixes: ["4","9"], length: 8, format: "XXX XX XXX" }, landline: { prefixes: ["2","3","5","6","7"], length: 8, format: "XX XX XX XX" }, toll_free: { prefixes: ["800"], length: 8, format: "800 X XXXX" }, premium: { prefixes: ["820","829","844","848","877"], length: 8, format: "82X XX XXX" } } },
  { name: "Denmark", code: "DK", region: "Western Europe", dialCode: "+45", services: { mobile: { prefixes: ["2","3","4","5","6","7","8","9"], length: 8, format: "XX XX XX XX" }, landline: { prefixes: ["32","33","35","36","38","39","42","43","44","45","46","47","48","49","52","53","54","55","56","57","58","59","62","63","64","65","66","74","75","76","86","87","89","96","97","98","99"], length: 8, format: "XX XX XX XX" }, toll_free: { prefixes: ["80"], length: 8, format: "80 XX XX XX" }, premium: { prefixes: ["90"], length: 8, format: "90 XX XX XX" } } },
  { name: "Finland", code: "FI", region: "Western Europe", dialCode: "+358", services: { mobile: { prefixes: ["40","41","42","43","44","45","46","50"], length: 9, format: "04X XXX XXXX" }, landline: { prefixes: ["2","3","5","6","8","9","13","14","15","16","17","18","19"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXX" }, premium: { prefixes: ["700","600"], length: 9, format: "0700 XXXXXX" } } },
  { name: "Switzerland", code: "CH", region: "Western Europe", dialCode: "+41", services: { mobile: { prefixes: ["74","75","76","77","78","79"], length: 9, format: "07X XXX XX XX" }, landline: { prefixes: ["21","22","26","27","31","32","33","34","41","43","44","51","52","55","56","58","61","62","71","81","91"], length: 9, format: "0XX XXX XX XX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900","901","906"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Austria", code: "AT", region: "Western Europe", dialCode: "+43", services: { mobile: { prefixes: ["650","660","664","676","680","688","699"], length: 10, format: "0XXX XXXXXXX" }, landline: { prefixes: ["1","316","662","512","732","463","732","512"], length: 10, format: "0XX XXXXXXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXX" }, premium: { prefixes: ["900","930","931","939"], length: 10, format: "0900 XXXXXXX" } } },
  { name: "Portugal", code: "PT", region: "Western Europe", dialCode: "+351", services: { mobile: { prefixes: ["91","92","93","96"], length: 9, format: "9XX XXX XXX" }, landline: { prefixes: ["21","22","231","232","233","234","235","236","238","239","241","242","243","244","245","249","251","252","253","254","255","256","258","259","261","262","263","265","266","268","269","271","272","273","274","275","276","277","278","279","281","282","283","284","285","286","289","291","292","295","296","298","299"], length: 9, format: "2XX XXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" }, premium: { prefixes: ["707","708","760","761","762","763","764","765","766","767","768","769"], length: 9, format: "7XX XXX XXX" }, voip: { prefixes: ["30"], length: 9, format: "30X XXX XXX" } } },
  { name: "Ireland", code: "IE", region: "Western Europe", dialCode: "+353", services: { mobile: { prefixes: ["83","85","86","87","89"], length: 9, format: "08X XXX XXXX" }, landline: { prefixes: ["1","21","22","23","24","25","26","27","28","29","40","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","90","91","92","93","94","95","96","97","98","99"], length: 9, format: "0X XX XX XX XX" }, toll_free: { prefixes: ["1800","1850"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["1550","1570","1580","1590"], length: 10, format: "1550 XXX XXX" } } },
  { name: "Greece", code: "GR", region: "Western Europe", dialCode: "+30", services: { mobile: { prefixes: ["690","691","693","694","695","697","698","699"], length: 10, format: "69X XXX XXXX" }, landline: { prefixes: ["21","22","23","24","25","26","27","28"], length: 10, format: "2XX XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "800 XXX XXXX" }, premium: { prefixes: ["901","902","903","904","905","906","907","908","909"], length: 10, format: "90X XXX XXXX" } } },
  { name: "Luxembourg", code: "LU", region: "Western Europe", dialCode: "+352", services: { mobile: { prefixes: ["621","628","651","661","671","681","691"], length: 9, format: "6XX XXX XXX" }, landline: { prefixes: ["2","26","27","28","29","44","46","47","48","49","52","53","54","55","56","57","58","59"], length: 9, format: "XX XXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXXXX" } } },
  { name: "Malta", code: "MT", region: "Western Europe", dialCode: "+356", services: { mobile: { prefixes: ["79","99","77","97"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["21","22","23","24","25","26","27","28","29"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800X XXXX" } } },
  { name: "Iceland", code: "IS", region: "Western Europe", dialCode: "+354", services: { mobile: { prefixes: ["6","7","8"], length: 7, format: "XXX XXXX" }, landline: { prefixes: ["4","5"], length: 7, format: "XXX XXXX" }, toll_free: { prefixes: ["800"], length: 7, format: "800 XXXX" } } },
  { name: "Cyprus", code: "CY", region: "Western Europe", dialCode: "+357", services: { mobile: { prefixes: ["96","97","99"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["22","23","24","25","26","27","28","29"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800X XXXX" } } },

  // ── EASTERN EUROPE ──
  { name: "Russia", code: "RU", region: "Eastern Europe", dialCode: "+7", services: { mobile: { prefixes: ["900","901","902","903","904","905","906","908","909","910","911","912","913","914","915","916","917","918","919","920","921","922","923","924","925","926","927","928","929","950","951","952","953","954","955","960","961","962","963","964","965","966","967","968","969","977","978","980","981","982","983","984","985","986","987","988","989"], length: 10, format: "8 (XXX) XXX-XX-XX" }, landline: { prefixes: ["495","499","812","343","383","863","846","831","391","351","473"], length: 10, format: "8 (XXX) XXX-XX-XX" }, toll_free: { prefixes: ["800"], length: 10, format: "8-800-XXX-XX-XX" }, premium: { prefixes: ["809"], length: 10, format: "8-809-XXX-XXXX" } } },
  { name: "Poland", code: "PL", region: "Eastern Europe", dialCode: "+48", services: { mobile: { prefixes: ["45","50","51","53","57","60","66","69","72","73","78","79","88"], length: 9, format: "XXX XXX XXX" }, landline: { prefixes: ["12","13","14","15","16","17","18","22","23","24","25","29","32","33","34","43","44","46","48","52","54","55","56","58","59","61","62","63","65","67","68","71","74","75","76","77","81","82","83","84","85","86","87","89","91","94","95"], length: 9, format: "XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" }, premium: { prefixes: ["700","702","703","707","708","709"], length: 9, format: "70X XXX XXX" } } },
  { name: "Ukraine", code: "UA", region: "Eastern Europe", dialCode: "+380", services: { mobile: { prefixes: ["50","63","66","67","68","73","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["44","32","57","61","62","48","56","46","41","55","45","43","47","53","64","66"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XX XXXX" } } },
  { name: "Romania", code: "RO", region: "Eastern Europe", dialCode: "+40", services: { mobile: { prefixes: ["720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","740","741","742","743","744","745","746","747","748","749","750","751","752","753","754","755","756","757","758","759","760","761","762","763","764","765","766","767","768","769","770","771","772","773","774","775","776","777","778","779"], length: 9, format: "0XXX XXX XXX" }, landline: { prefixes: ["21","23","24","25","26","27","28","31","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900","903","906","907","908","909"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Czech Republic", code: "CZ", region: "Eastern Europe", dialCode: "+420", services: { mobile: { prefixes: ["601","602","603","604","605","606","607","608","702","720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","736","737","738","739","770","771","772","773","774","775","776","777","778","779","790","791","792","793","794","795","796","797","798","799"], length: 9, format: "XXX XXX XXX" }, landline: { prefixes: ["2","35","37","38","39","46","47","48","49","51","53","54","55","56","57","58","59"], length: 9, format: "XXX XXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" }, premium: { prefixes: ["900","906","907","908","909"], length: 9, format: "900 XXX XXX" } } },
  { name: "Hungary", code: "HU", region: "Eastern Europe", dialCode: "+36", services: { mobile: { prefixes: ["20","30","31","50","51","52","53","54","55","56","57","58","59","70"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["1","22","23","24","25","26","27","28","29","32","33","34","35","36","37","38","39","42","44","45","46","47","48","49","52","53","54","55","56","57","58","59","62","63","64","66","67","68","69","72","73","74","75","76","77","78","79","82","83","84","85","87","88","89","92","93","94","95","96","98","99"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["80"], length: 9, format: "080 XXX XXX" }, premium: { prefixes: ["90"], length: 9, format: "090 XXX XXX" } } },
  { name: "Bulgaria", code: "BG", region: "Eastern Europe", dialCode: "+359", services: { mobile: { prefixes: ["87","88","89","98","99"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["2","32","36","42","52","56","58","60","62","64","66","68","70","72","74","76","78","80","82","84","86","88","92","94","96","98"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXX" }, premium: { prefixes: ["900"], length: 9, format: "0900 XXXXX" } } },
  { name: "Serbia", code: "RS", region: "Eastern Europe", dialCode: "+381", services: { mobile: { prefixes: ["60","61","62","63","64","65","66","69"], length: 9, format: "06X XXX XXXX" }, landline: { prefixes: ["11","21","31","34","35","36","37","38","39","41","44","45","46","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","11"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXX" } } },
  { name: "Croatia", code: "HR", region: "Eastern Europe", dialCode: "+385", services: { mobile: { prefixes: ["91","92","95","97","98","99"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["1","20","21","22","23","31","32","33","34","35","40","42","43","44","47","48","49","51","52","53","55","91","92","95","97","98","99"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXX" } } },
  { name: "Slovakia", code: "SK", region: "Eastern Europe", dialCode: "+421", services: { mobile: { prefixes: ["90","91","94","95"], length: 9, format: "09XX XXX XXX" }, landline: { prefixes: ["2","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48","51","52","53","54","55","56","57","58","59"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900","906","907","908","909"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Belarus", code: "BY", region: "Eastern Europe", dialCode: "+375", services: { mobile: { prefixes: ["25","29","33","44"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["17","162","165","174","176","177","178","212","216","222","225","232","236","2"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" } } },
  { name: "Moldova", code: "MD", region: "Eastern Europe", dialCode: "+373", services: { mobile: { prefixes: ["60","61","62","67","68","69","76","78","79"], length: 8, format: "0XX XXX XXX" }, landline: { prefixes: ["22","23","24","25","26","27","28","29","31","32","33","34","35","36","37","38","39","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69"], length: 8, format: "0XX XXX XXX" }, toll_free: { prefixes: ["800"], length: 8, format: "0800 XXXX" } } },
  { name: "Albania", code: "AL", region: "Eastern Europe", dialCode: "+355", services: { mobile: { prefixes: ["67","68","69"], length: 9, format: "06X XXX XXXX" }, landline: { prefixes: ["4","22","33","54","52","53","55","56","57","58","59","61","62","63","64","65","66","67","68","69","72","74","81","82","84","85","86","87","88","91","92","93","94","95","96"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Bosnia and Herzegovina", code: "BA", region: "Eastern Europe", dialCode: "+387", services: { mobile: { prefixes: ["60","61","62","63","64","65","66"], length: 8, format: "06X XXX XXX" }, landline: { prefixes: ["30","31","32","33","34","35","36","37","38","39","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79"], length: 8, format: "0XX XXX XXX" } } },
  { name: "North Macedonia", code: "MK", region: "Eastern Europe", dialCode: "+389", services: { mobile: { prefixes: ["70","71","72","73","74","75","76","77","78","79"], length: 8, format: "07X XXX XXX" }, landline: { prefixes: ["2","31","32","33","34","42","43","44","45","46","47","48","49","52","53","54","55","56","57","58","59","62","63","64","65","66","67","68","69","76","78","79"], length: 8, format: "0X XXX XXXX" } } },
  { name: "Slovenia", code: "SI", region: "Eastern Europe", dialCode: "+386", services: { mobile: { prefixes: ["31","40","41","51","70","71"], length: 8, format: "0XX XXX XXX" }, landline: { prefixes: ["1","2","3","4","5","7"], length: 8, format: "0X XXX XXXX" }, toll_free: { prefixes: ["80"], length: 8, format: "080 XXXXX" }, premium: { prefixes: ["90"], length: 8, format: "090 XXXXX" } } },
  { name: "Estonia", code: "EE", region: "Eastern Europe", dialCode: "+372", services: { mobile: { prefixes: ["5"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["3","4","6","7","8","9"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800 XXXXX" } } },
  { name: "Latvia", code: "LV", region: "Eastern Europe", dialCode: "+371", services: { mobile: { prefixes: ["2"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["6","7","8"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "8000 XXXX" } } },
  { name: "Lithuania", code: "LT", region: "Eastern Europe", dialCode: "+370", services: { mobile: { prefixes: ["6"], length: 8, format: "X XXX XXXX" }, landline: { prefixes: ["3","4","5"], length: 8, format: "X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "8 800 XXXXX" } } },

  // ── MIDDLE EAST ──
  { name: "Saudi Arabia", code: "SA", region: "Middle East", dialCode: "+966", services: { mobile: { prefixes: ["50","53","54","55","56","57","58","59"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["11","12","13","14","16","17"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "800 XXX XXXX" } } },
  { name: "United Arab Emirates", code: "AE", region: "Middle East", dialCode: "+971", services: { mobile: { prefixes: ["50","52","54","55","56","58"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["2","3","4","6","7","9"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXXXXX" } } },
  { name: "Israel", code: "IL", region: "Middle East", dialCode: "+972", services: { mobile: { prefixes: ["50","52","53","54","55","57","58"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["2","3","4","8","9"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["1800","1700"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["1900","1905"], length: 10, format: "1900 XXX XXX" }, voip: { prefixes: ["72","73","76","77","78","79"], length: 9, format: "07X XXXX XXX" } } },
  { name: "Turkey", code: "TR", region: "Middle East", dialCode: "+90", services: { mobile: { prefixes: ["501","505","506","507","530","531","532","533","534","535","536","537","538","539","540","541","542","543","544","545","546","547","548","549","550","551","552","553","554","555","556","557","558","559","561","562","563","564","565","570","571","572","573","576","579"], length: 10, format: "0XXX XXX XXXX" }, landline: { prefixes: ["212","216","232","242","252","256","258","262","264","266","272","274","276","282","284","286","288","312","318","322","324","326","328","332","338","342","344","346","348","352","354","356","358","362","364","366","368","370","372","374","376","378","380","382","384","386","388","392","394","396","398","412","414","416","418","422","424","426","428","432","434","436","438","442","444","446","448","452","454","456","458","462","464","466","468","472","474","476","478","482","484","486","488"], length: 10, format: "0XXX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" }, premium: { prefixes: ["900","901","902"], length: 10, format: "0900 XXX XXXX" } } },
  { name: "Iran", code: "IR", region: "Middle East", dialCode: "+98", services: { mobile: { prefixes: ["910","911","912","913","914","915","916","917","918","919","920","921","922","930","933","935","936","937","938","939","941","990","991"], length: 10, format: "09XX XXX XXXX" }, landline: { prefixes: ["21","24","25","26","28","31","32","33","34","35","36","38","41","44","45","51","54","56","57","58","61","66","71","74","77","81","83","84","86","87"], length: 10, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["021800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Iraq", code: "IQ", region: "Middle East", dialCode: "+964", services: { mobile: { prefixes: ["770","771","772","773","774","775","776","777","778","779","780","781","782","783","784","785","786","787","788","789","790","791","792","793","794","795","796","797","798","799"], length: 10, format: "07XX XXX XXXX" }, landline: { prefixes: ["1","21","22","23","24","25","30","31","32","33","36","40","42","43","44","50","51","53","60","62","66","71","72","73","74","75","76","78","80","82","83","84","85","86"], length: 8, format: "0X XXXX XXXX" } } },
  { name: "Jordan", code: "JO", region: "Middle East", dialCode: "+962", services: { mobile: { prefixes: ["77","78","79"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["2","3","5","6"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXX" } } },
  { name: "Lebanon", code: "LB", region: "Middle East", dialCode: "+961", services: { mobile: { prefixes: ["3","70","71","76","78","79"], length: 8, format: "XX XXX XXX" }, landline: { prefixes: ["1","4","5","6","7","8","9"], length: 8, format: "0X XXX XXX" } } },
  { name: "Kuwait", code: "KW", region: "Middle East", dialCode: "+965", services: { mobile: { prefixes: ["5","6","9"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 8, format: "1800 XXXX" } } },
  { name: "Qatar", code: "QA", region: "Middle East", dialCode: "+974", services: { mobile: { prefixes: ["3","5","6","7"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["4"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800X XXXX" } } },
  { name: "Bahrain", code: "BH", region: "Middle East", dialCode: "+973", services: { mobile: { prefixes: ["3","6"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["1","7","8"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800X XXXX" } } },
  { name: "Oman", code: "OM", region: "Middle East", dialCode: "+968", services: { mobile: { prefixes: ["7","9"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800X XXXX" } } },
  { name: "Yemen", code: "YE", region: "Middle East", dialCode: "+967", services: { mobile: { prefixes: ["7"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["1","2","3","4","5","6"], length: 8, format: "0X XXX XXX" } } },
  { name: "Syria", code: "SY", region: "Middle East", dialCode: "+963", services: { mobile: { prefixes: ["93","94","95","96","99"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["11","21","31","33","34","41","43","51","52","53"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Palestine", code: "PS", region: "Middle East", dialCode: "+970", services: { mobile: { prefixes: ["59"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["2","4","8","9"], length: 9, format: "0X XXX XXXX" } } },

  // ── AFRICA ──
  { name: "Nigeria", code: "NG", region: "Africa", dialCode: "+234", services: { mobile: { prefixes: ["701","702","703","704","705","706","707","708","709","802","803","804","805","806","807","808","809","810","811","812","813","814","815","816","817","818","819","901","902","903","904","905","906","907","908","909","912","913","914","915","916","917","918","919"], length: 10, format: "0XXX XXX XXXX" }, landline: { prefixes: ["1","2","3","4","5","6","7","8","9"], length: 8, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "South Africa", code: "ZA", region: "Africa", dialCode: "+27", services: { mobile: { prefixes: ["60","61","62","63","64","65","66","67","68","71","72","73","74","76","78","79","81","82","83","84","85","87"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["10","11","12","13","14","15","16","17","18","21","22","23","31","32","33","34","35","39","40","41","42","43","44","45","46","47","48","49","51","53","54","56","57","58","59"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["861","862","863","864","865","866","867","868","869"], length: 9, format: "086X XXX XXX" } } },
  { name: "Kenya", code: "KE", region: "Africa", dialCode: "+254", services: { mobile: { prefixes: ["70","71","72","74","75","76","77","78","79","110","111","112","113","114","115","116","117","118","119"], length: 9, format: "07XX XXX XXX" }, landline: { prefixes: ["20","40","41","42","43","44","45","46","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69"], length: 9, format: "0XX XXXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" } } },
  { name: "Egypt", code: "EG", region: "Africa", dialCode: "+20", services: { mobile: { prefixes: ["10","11","12","15"], length: 10, format: "01X XXXX XXXX" }, landline: { prefixes: ["2","3","13","40","45","46","47","48","50","55","57","62","64","65","66","68","69","82","84","86","88","92","93","95","96","97"], length: 9, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Ethiopia", code: "ET", region: "Africa", dialCode: "+251", services: { mobile: { prefixes: ["91","92","93","94","95","96","97"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["11","22","33","34","35","46","47","57","58"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Tanzania", code: "TZ", region: "Africa", dialCode: "+255", services: { mobile: { prefixes: ["61","62","63","65","67","68","69","71","74","75","76","77","78"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["22","23","24","25","26","27","28","29"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" } } },
  { name: "Ghana", code: "GH", region: "Africa", dialCode: "+233", services: { mobile: { prefixes: ["20","23","24","25","26","27","28","29","50","54","55","57","59"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Uganda", code: "UG", region: "Africa", dialCode: "+256", services: { mobile: { prefixes: ["70","71","72","75","77","78","79"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["41","42","43","45","46","47","48","49"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Morocco", code: "MA", region: "Africa", dialCode: "+212", services: { mobile: { prefixes: ["60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79"], length: 9, format: "0X XX XX XX XX" }, landline: { prefixes: ["52","53","54","55","56","57","58"], length: 9, format: "05X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXX" } } },
  { name: "Algeria", code: "DZ", region: "Africa", dialCode: "+213", services: { mobile: { prefixes: ["550","551","552","553","554","555","556","557","558","559","660","661","662","663","664","665","666","667","668","669","770","771","772","773","774","775","776","777","778","779"], length: 9, format: "0XX XX XX XXX" }, landline: { prefixes: ["21","23","24","25","26","27","28","29","31","32","33","34","35","36","37","38","39","41","42","43","44","45","46","47","48","49"], length: 9, format: "0XX XX XX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXX" } } },
  { name: "Tunisia", code: "TN", region: "Africa", dialCode: "+216", services: { mobile: { prefixes: ["20","21","22","23","24","25","26","27","28","29","50","51","52","53","54","55","56","57","58","59","90","91","92","93","94","95","96","97","98","99"], length: 8, format: "XX XXX XXX" }, landline: { prefixes: ["31","32","33","34","35","36","37","38","39","71","72","73","74","75","76","77","78","79","81","82","83","84","85","86","87","88","89"], length: 8, format: "XX XXX XXX" }, toll_free: { prefixes: ["80"], length: 8, format: "80 XXX XXX" } } },
  { name: "Cameroon", code: "CM", region: "Africa", dialCode: "+237", services: { mobile: { prefixes: ["650","651","652","653","654","655","656","657","658","659","670","671","672","673","674","675","676","677","678","679","680","681","682","683","684","685","686","687","688","689","690","691","692","693","694","695","696","697","698","699"], length: 9, format: "6XX XXX XXX" }, landline: { prefixes: ["2","3"], length: 9, format: "XXX XXX XXX" } } },
  { name: "Ivory Coast", code: "CI", region: "Africa", dialCode: "+225", services: { mobile: { prefixes: ["01","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79"], length: 10, format: "XX XX XX XX XX" }, landline: { prefixes: ["27","30"], length: 10, format: "27 XX XX XX XX" } } },
  { name: "Senegal", code: "SN", region: "Africa", dialCode: "+221", services: { mobile: { prefixes: ["70","75","76","77","78"], length: 9, format: "7X XXX XXXX" }, landline: { prefixes: ["30","33"], length: 9, format: "3X XXX XXXX" } } },
  { name: "Angola", code: "AO", region: "Africa", dialCode: "+244", services: { mobile: { prefixes: ["91","92","93","94","95","99"], length: 9, format: "9XX XXX XXX" }, landline: { prefixes: ["2"], length: 9, format: "XXX XXX XXX" } } },
  { name: "Mozambique", code: "MZ", region: "Africa", dialCode: "+258", services: { mobile: { prefixes: ["82","83","84","86","87"], length: 9, format: "8X XXX XXXX" }, landline: { prefixes: ["21","22","23","24","25","26","27","28","29"], length: 9, format: "2X XXX XXXX" } } },
  { name: "Madagascar", code: "MG", region: "Africa", dialCode: "+261", services: { mobile: { prefixes: ["32","33","34","38"], length: 9, format: "0XX XX XXX XX" }, landline: { prefixes: ["20"], length: 9, format: "020 XX XXX XX" } } },
  { name: "Zambia", code: "ZM", region: "Africa", dialCode: "+260", services: { mobile: { prefixes: ["95","96","97"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["21"], length: 9, format: "021X XXX XXX" } } },
  { name: "Zimbabwe", code: "ZW", region: "Africa", dialCode: "+263", services: { mobile: { prefixes: ["71","73","77","78"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["4","9","20","22","23","24","29","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","74","81","82","83","84","85","86","87","88","89","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Rwanda", code: "RW", region: "Africa", dialCode: "+250", services: { mobile: { prefixes: ["72","73","78","79"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["25"], length: 9, format: "025X XXX XXX" } } },
  { name: "Botswana", code: "BW", region: "Africa", dialCode: "+267", services: { mobile: { prefixes: ["71","72","73","74","75","76","77"], length: 8, format: "7X XXX XXX" }, landline: { prefixes: ["24","31","36","38","39","45","46","47","53","54","55","56","57","58","59","62","63","65","67","68","69","74","75","76"], length: 8, format: "XX XXX XXX" } } },
  { name: "Namibia", code: "NA", region: "Africa", dialCode: "+264", services: { mobile: { prefixes: ["60","81","85"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["61","62","63","64","65","66","67","68","69"], length: 9, format: "0XX XXX XXX" } } },
  { name: "Mali", code: "ML", region: "Africa", dialCode: "+223", services: { mobile: { prefixes: ["50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","90","91","92","93","94","95","96","97","98","99"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["20","44","45"], length: 8, format: "XXXX XXXX" } } },
  { name: "Burkina Faso", code: "BF", region: "Africa", dialCode: "+226", services: { mobile: { prefixes: ["60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79"], length: 8, format: "XX XX XX XX" }, landline: { prefixes: ["20","22","24","25","26","27","28","29","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"], length: 8, format: "XX XX XX XX" } } },
  { name: "Sudan", code: "SD", region: "Africa", dialCode: "+249", services: { mobile: { prefixes: ["90","91","92","93","94","95","96","97","98","99"], length: 9, format: "09X XXX XXXX" }, landline: { prefixes: ["15","16","17","18","19","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Liberia", code: "LR", region: "Africa", dialCode: "+231", services: { mobile: { prefixes: ["4","5","6","7","8","9"], length: 8, format: "XX XXX XXX" }, landline: { prefixes: ["2"], length: 7, format: "XXX XXXX" } } },

  // ── ASIA PACIFIC ──
  { name: "China", code: "CN", region: "Asia Pacific", dialCode: "+86", services: { mobile: { prefixes: ["130","131","132","133","134","135","136","137","138","139","145","150","151","152","153","155","156","157","158","159","166","170","171","172","173","175","176","177","178","180","181","182","183","184","185","186","187","188","189","191","198","199"], length: 11, format: "XXX XXXX XXXX" }, landline: { prefixes: ["10","20","21","22","23","24","25","27","28","29"], length: 11, format: "0XXX XXXXXXXX" }, toll_free: { prefixes: ["400","800"], length: 10, format: "400 XXX XXXX" }, voip: { prefixes: ["17"], length: 11, format: "17X XXXX XXXX" } } },
  { name: "India", code: "IN", region: "Asia Pacific", dialCode: "+91", services: { mobile: { prefixes: ["6","7","8","9"], length: 10, format: "XXXXX XXXXX" }, landline: { prefixes: ["11","22","33","44","40","80","20"], length: 10, format: "0XX-XXXXXXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800-XXX-XXXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900-XXX-XXXX" }, voip: { prefixes: ["70","80"], length: 10, format: "XXXXX XXXXX" } } },
  { name: "Japan", code: "JP", region: "Asia Pacific", dialCode: "+81", services: { mobile: { prefixes: ["70","80","90"], length: 10, format: "0XX-XXXX-XXXX" }, landline: { prefixes: ["3","6","11","22","52","75","92"], length: 10, format: "0X-XXXX-XXXX" }, toll_free: { prefixes: ["120","800"], length: 10, format: "0120-XXX-XXX" }, premium: { prefixes: ["990"], length: 10, format: "0990-XX-XXXX" }, voip: { prefixes: ["50"], length: 10, format: "050-XXXX-XXXX" } } },
  { name: "South Korea", code: "KR", region: "Asia Pacific", dialCode: "+82", services: { mobile: { prefixes: ["10","16","17","18","19"], length: 10, format: "010-XXXX-XXXX" }, landline: { prefixes: ["2","31","32","33","41","42","43","44","51","52","53","54","55","61","62","63","64"], length: 9, format: "0X-XXXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800-XXX-XXXX" }, premium: { prefixes: ["700","060"], length: 10, format: "0700-XXX-XXXX" }, voip: { prefixes: ["70"], length: 10, format: "070-XXXX-XXXX" } } },
  { name: "Australia", code: "AU", region: "Asia Pacific", dialCode: "+61", services: { mobile: { prefixes: ["4"], length: 9, format: "04XX XXX XXX" }, landline: { prefixes: ["2","3","7","8"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900 XXX XXX" }, voip: { prefixes: ["550"], length: 10, format: "0550 XXX XXX" } } },
  { name: "Indonesia", code: "ID", region: "Asia Pacific", dialCode: "+62", services: { mobile: { prefixes: ["811","812","813","814","815","816","817","818","819","821","822","823","828","851","852","853","855","856","857","858","877","878","881","882","883","884","885","886","887","888","889","896","897","898","899"], length: 12, format: "08XX XXXX XXXX" }, landline: { prefixes: ["21","22","24","31","61","65","711","717","721","726","731","741","751","761","771","778","780"], length: 10, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800","803","804"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Pakistan", code: "PK", region: "Asia Pacific", dialCode: "+92", services: { mobile: { prefixes: ["300","301","302","303","304","305","306","307","308","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349"], length: 10, format: "0XXX XXXXXXX" }, landline: { prefixes: ["21","22","41","42","51","52","55","61","62","71","81","91","92"], length: 9, format: "0XX XXXXXXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXXXX" } } },
  { name: "Bangladesh", code: "BD", region: "Asia Pacific", dialCode: "+880", services: { mobile: { prefixes: ["1300","1301","1302","1303","1304","1305","1306","1307","1308","1309","1310","1311","1312","1313","1314","1315","1316","1317","1318","1319","1320","1321","1322","1323","1324","1325","1326","1327","1328","1329","1330","1331","1332","1333","1334","1335","1336","1337","1338","1339","1340","1341","1342","1343","1344","1345","1346","1347","1348","1349","1350","1351","1352","1353","1354","1355","1356","1357","1358","1359","1360","1361","1362","1363","1364","1365","1366","1367","1368","1369","1370","1371","1372","1373","1374","1375","1376","1377","1378","1379","1380","1381","1382","1383","1384","1385","1386","1387","1388","1389","1390","1391","1392","1393","1394","1395","1396","1397","1398","1399","1400","1401","1402","1403","1404","1405","1406","1407","1408","1409","1410","1411","1412","1413","1414","1415","1416","1417","1418","1419","1420","1421","1422","1423","1424","1425","1426","1427","1428","1429","1430","1431","1432","1433","1434","1435","1436","1437","1438","1439","1440","1441","1442","1443","1444","1445","1446","1447","1448","1449","1450","1451","1452","1453","1454","1455","1456","1457","1458","1459","1460","1461","1462","1463","1464","1465","1466","1467","1468","1469","1470","1471","1472","1473","1474","1475","1476","1477","1478","1479","1480","1481","1482","1483","1484","1485","1486","1487","1488","1489","1490","1491","1492","1493","1494","1495","1496","1497","1498","1499","1500","1501","1502","1503","1504","1505","1506","1507","1508","1509","1510","1511","1512","1513","1514","1515","1516","1517","1518","1519","1520","1521","1522","1523","1524","1525","1526","1527","1528","1529","1530","1531","1532","1533","1534","1535","1536","1537","1538","1539","1540","1541","1542","1543","1544","1545","1546","1547","1548","1549","1550","1551","1552","1553","1554","1555","1556","1557","1558","1559","1560","1561","1562","1563","1564","1565","1566","1567","1568","1569","1570","1571","1572","1573","1574","1575","1576","1577","1578","1579","1580","1581","1582","1583","1584","1585","1586","1587","1588","1589","1590","1591","1592","1593","1594","1595","1596","1597","1598","1599","1600","1601","1602","1603","1604","1605","1606","1607","1608","1609","1610","1611","1612","1613","1614","1615","1616","1617","1618","1619","1620","1621","1622","1623","1624","1625","1626","1627","1628","1629","1630","1631","1632","1633","1634","1635","1636","1637","1638","1639","1640","1641","1642","1643","1644","1645","1646","1647","1648","1649","1650","1651","1652","1653","1654","1655","1656","1657","1658","1659","1660","1661","1662","1663","1664","1665","1666","1667","1668","1669","1670","1671","1672","1673","1674","1675","1676","1677","1678","1679","1680","1681","1682","1683","1684","1685","1686","1687","1688","1689","1690","1691","1692","1693","1694","1695","1696","1697","1698","1699","1700","1701","1702","1703","1704","1705","1706","1707","1708","1709","1710","1711","1712","1713","1714","1715","1716","1717","1718","1719","1720","1721","1722","1723","1724","1725","1726","1727","1728","1729","1730","1731","1732","1733","1734","1735","1736","1737","1738","1739","1740","1741","1742","1743","1744","1745","1746","1747","1748","1749","1750","1751","1752","1753","1754","1755","1756","1757","1758","1759","1760","1761","1762","1763","1764","1765","1766","1767","1768","1769","1770","1771","1772","1773","1774","1775","1776","1777","1778","1779","1780","1781","1782","1783","1784","1785","1786","1787","1788","1789","1790","1791","1792","1793","1794","1795","1796","1797","1798","1799","1800","1801","1802","1803","1804","1805","1806","1807","1808","1809","1810","1811","1812","1813","1814","1815","1816","1817","1818","1819","1820","1821","1822","1823","1824","1825","1826","1827","1828","1829","1830","1831","1832","1833","1834","1835","1836","1837","1838","1839","1840","1841","1842","1843","1844","1845","1846","1847","1848","1849","1850","1851","1852","1853","1854","1855","1856","1857","1858","1859","1860","1861","1862","1863","1864","1865","1866","1867","1868","1869","1870","1871","1872","1873","1874","1875","1876","1877","1878","1879","1880","1881","1882","1883","1884","1885","1886","1887","1888","1889","1890","1891","1892","1893","1894","1895","1896","1897","1898","1899","1900","1901","1902","1903","1904","1905","1906","1907","1908","1909","1910","1911","1912","1913","1914","1915","1916","1917","1918","1919","1920","1921","1922","1923","1924","1925","1926","1927","1928","1929","1930","1931","1932","1933","1934","1935","1936","1937","1938","1939","1940","1941","1942","1943","1944","1945","1946","1947","1948","1949","1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999"], length: 10, format: "01XXX XXXXXX" }, landline: { prefixes: ["2","31","41","431","4221","4241","4261","4281","431","441","5161","531","581","591","621","631","641","651","661","671","681","691","721","731","741","751","761","771","781","791","821","831","841","851","861","871","881","891","921","931","941","951","961","971","981","91"], length: 10, format: "0XX XXXX XXXX" } } },
  { name: "Vietnam", code: "VN", region: "Asia Pacific", dialCode: "+84", services: { mobile: { prefixes: ["32","33","34","35","36","37","38","39","56","58","70","76","77","78","79","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XXX XXX XXX" }, landline: { prefixes: ["24","28","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","238","239"], length: 9, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" } } },
  { name: "Thailand", code: "TH", region: "Asia Pacific", dialCode: "+66", services: { mobile: { prefixes: ["6","8","9"], length: 9, format: "0X XXXX XXXX" }, landline: { prefixes: ["2","3","4","5","7"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["190","900"], length: 9, format: "1900 XXX XXX" } } },
  { name: "Malaysia", code: "MY", region: "Asia Pacific", dialCode: "+60", services: { mobile: { prefixes: ["10","11","12","13","14","16","17","18","19"], length: 10, format: "0XX XXXX XXXX" }, landline: { prefixes: ["3","4","5","6","7","9","82","83","84","85","86","87","88","89"], length: 9, format: "0X-XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XX XXXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900 XX XXXX" } } },
  { name: "Philippines", code: "PH", region: "Asia Pacific", dialCode: "+63", services: { mobile: { prefixes: ["905","906","907","908","909","910","911","912","913","915","916","917","918","919","920","921","922","923","925","926","927","928","929","930","931","932","933","934","935","936","937","938","939","942","943","944","945","946","947","948","949","950","951","952","953","954","955","956","957","958","959","961","963","964","965","966","967","970","971","972","973","974","975","976","977","978","979","980","981","982","983","984","985","986","987","988","989","990","991","992","993","994","995","996","997","998","999"], length: 10, format: "0XXX XXX XXXX" }, landline: { prefixes: ["2","32","33","34","35","36","38","42","43","44","45","46","47","48","49","52","53","54","55","56","62","63","64","65","68","72","74","75","77","82","83","84","85","86","87","88","89"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXXXXXX" } } },
  { name: "Singapore", code: "SG", region: "Asia Pacific", dialCode: "+65", services: { mobile: { prefixes: ["8","9"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["6"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900 XXX XXXX" } } },
  { name: "New Zealand", code: "NZ", region: "Asia Pacific", dialCode: "+64", services: { mobile: { prefixes: ["20","21","22","27","28","29"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["3","4","6","7","9"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Sri Lanka", code: "LK", region: "Asia Pacific", dialCode: "+94", services: { mobile: { prefixes: ["70","71","72","74","75","76","77","78"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["11","21","23","24","25","26","27","31","32","33","34","35","36","37","38","41","45","47","51","52","54","55","57","63","65","66","67"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["1990"], length: 10, format: "1990 XXX XXX" } } },
  { name: "Nepal", code: "NP", region: "Asia Pacific", dialCode: "+977", services: { mobile: { prefixes: ["96","97","98"], length: 10, format: "09X XXXX XXXX" }, landline: { prefixes: ["1","21","41","42","44","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","77","78","79","81","82","83","84","85","86","87","88","89","91"], length: 8, format: "0XX XXXXXXX" } } },
  { name: "Myanmar", code: "MM", region: "Asia Pacific", dialCode: "+95", services: { mobile: { prefixes: ["9"], length: 9, format: "09 XXXX XXXX" }, landline: { prefixes: ["1","2","42","43","44","45","46","47","48","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"], length: 8, format: "0X XXXX XXX" } } },
  { name: "Cambodia", code: "KH", region: "Asia Pacific", dialCode: "+855", services: { mobile: { prefixes: ["10","11","12","15","16","17","18","69","70","71","76","77","78","79","81","85","86","87","88","89","90","92","93","95","96","97","98","99"], length: 9, format: "0XX XXX XXX" }, landline: { prefixes: ["23","24","25","26","31","32","33","34","35","36","37","38","42","43","44","52","53","54","55","62","63","64","72","73","74","82","83","84","92","93","94"], length: 8, format: "0XX XXX XX" } } },
  { name: "Taiwan", code: "TW", region: "Asia Pacific", dialCode: "+886", services: { mobile: { prefixes: ["9"], length: 9, format: "09XX XXX XXX" }, landline: { prefixes: ["2","3","4","5","6","7","8","49","836","882","886","889","893","896","897","899","912","963","970","978","989"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" } } },
  { name: "Hong Kong", code: "HK", region: "Asia Pacific", dialCode: "+852", services: { mobile: { prefixes: ["5","6","9"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2","3"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 8, format: "800X XXXX" } } },
  { name: "Macau", code: "MO", region: "Asia Pacific", dialCode: "+853", services: { mobile: { prefixes: ["6"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["2","8"], length: 8, format: "XXXX XXXX" } } },
  { name: "Mongolia", code: "MN", region: "Asia Pacific", dialCode: "+976", services: { mobile: { prefixes: ["55","77","88","89","90","91","94","95","96","97","98","99"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["11","21","22","35","52","57","70","73","74","75","76","77"], length: 8, format: "XXXX XXXX" } } },
  { name: "Kazakhstan", code: "KZ", region: "Asia Pacific", dialCode: "+7", services: { mobile: { prefixes: ["700","701","702","705","706","707","708","709","710","711","712","713","714","715","716","717","718","719","720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","736","737","738","739","740","741","742","743","744","745","746","747","748","749","750","751","752","753","754","755","756","757","758","759","760","761","762","763","764","765","766","767","768","769","770","771","772","773","774","775","776","777","778","779","780","781","782","783","784","785","786","787","788","789","790","791","792","793","794","795","796","797","798","799"], length: 10, format: "8 (XXX) XXX-XXXX" }, landline: { prefixes: ["7172","7212","7222","7232","7242","7252","7262","7272","7282","7292","7302","7312","7322","7332","7342","7352","7362","7372","7382"], length: 10, format: "8 (XXX) XXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "8-800-XXX-XXXX" } } },
  { name: "Uzbekistan", code: "UZ", region: "Asia Pacific", dialCode: "+998", services: { mobile: { prefixes: ["90","91","93","94","95","97","99"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["71","72","73","74","75","76","77","78","79"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Azerbaijan", code: "AZ", region: "Asia Pacific", dialCode: "+994", services: { mobile: { prefixes: ["50","51","55","60","70","77","99"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["12","18","21","22","23","24","25","26","36"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXX" } } },
  { name: "Georgia", code: "GE", region: "Asia Pacific", dialCode: "+995", services: { mobile: { prefixes: ["514","555","557","558","559","568","570","571","574","577","591","592","593","595","596","597","598","599"], length: 9, format: "5XX XXX XXX" }, landline: { prefixes: ["22","23","24","25","26","27","28","29","32","34","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","77","78","79","81","82","83","84","85","86","87","88","89","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XX XXX XXXX" } } },
  { name: "Armenia", code: "AM", region: "Asia Pacific", dialCode: "+374", services: { mobile: { prefixes: ["33","41","43","44","49","55","77","91","93","94","95","96","97","98","99"], length: 8, format: "0XX XXX XXX" }, landline: { prefixes: ["10","11","12","22","23","31","32","33","34","35","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","77","78","79","81","82","83","84","85","86","87","88","89","91","92","93","94","95","96","97","98","99"], length: 8, format: "0XX XXX XXX" } } },
  { name: "Kyrgyzstan", code: "KG", region: "Asia Pacific", dialCode: "+996", services: { mobile: { prefixes: ["500","501","502","503","504","505","507","508","509","510","511","512","520","521","522","523","524","525","526","527","528","529","530","540","541","542","543","545","546","547","548","549","550","551","552","553","554","555","556","557","558","559","700","701","702","703","704","705","706","707","708","709","770","771","772","773","774","775","776","777","778","779","990","991","992","993","994","995","996","997","998","999"], length: 9, format: "0XXX XXXXXX" }, landline: { prefixes: ["312","3124","3125","3126","3127","3128","3129","3131","3132","3133","3134","3135","3141","3142","3143","3144","3145","3146","3147","3148","3149","3151","3152","3153","3154","3155","3156","3157","3158","3159","3161","3162","3163","3164","3165","3166","3167","3168","3169","3171","3172","3173","3174","3175","3176","3177","3178","3179","3181","3182","3183","3184","3185","3186","3187","3188","3189","3191","3192","3193","3194","3195","3196","3197","3198","3199","3222","3228","3231","3232","3233","3234","3235","3236","3237","3238","3239","3241","3242","3243","3244","3245","3246","3247","3248","3249","3251","3252","3253","3254","3255","3256","3257","3258","3259","3261","3262","3263","3264","3265","3266","3267","3268","3269","3271","3272","3273","3274","3275","3276","3277","3278","3279","3281","3282","3283","3284","3285","3286","3287","3288","3289","3291","3292","3293","3294","3295","3296","3297","3298","3299","3311","3312","3313","3314","3315","3316","3317","3318","3319","3321","3322","3323","3324","3325","3326","3327","3328","3329","3331","3332","3333","3334","3335","3336","3337","3338","3339","3341","3342","3343","3344","3345","3346","3347","3348","3349","3351","3352","3353","3354","3355","3356","3357","3358","3359","3361","3362","3363","3364","3365","3366","3367","3368","3369","3371","3372","3373","3374","3375","3376","3377","3378","3379","3381","3382","3383","3384","3385","3386","3387","3388","3389","3391","3392","3393","3394","3395","3396","3397","3398","3399","3411","3412","3413","3414","3415","3416","3417","3418","3419","3421","3422","3423","3424","3425","3426","3427","3428","3429","3431","3432","3433","3434","3435","3436","3437","3438","3439","3441","3442","3443","3444","3445","3446","3447","3448","3449","3451","3452","3453","3454","3455","3456","3457","3458","3459","3461","3462","3463","3464","3465","3466","3467","3468","3469","3471","3472","3473","3474","3475","3476","3477","3478","3479","3481","3482","3483","3484","3485","3486","3487","3488","3489","3491","3492","3493","3494","3495","3496","3497","3498","3499","3511","3512","3513","3514","3515","3516","3517","3518","3519","3521","3522","3523","3524","3525","3526","3527","3528","3529","3531","3532","3533","3534","3535","3536","3537","3538","3539","3541","3542","3543","3544","3545","3546","3547","3548","3549","3551","3552","3553","3554","3555","3556","3557","3558","3559","3561","3562","3563","3564","3565","3566","3567","3568","3569","3571","3572","3573","3574","3575","3576","3577","3578","3579","3581","3582","3583","3584","3585","3586","3587","3588","3589","3591","3592","3593","3594","3595","3596","3597","3598","3599"], length: 9, format: "0XXX XXXXXX" } } },
  { name: "Papua New Guinea", code: "PG", region: "Asia Pacific", dialCode: "+675", services: { mobile: { prefixes: ["7","8"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["3","4","5","6","9"], length: 8, format: "XXX XXXXX" } } },
  { name: "Fiji", code: "FJ", region: "Asia Pacific", dialCode: "+679", services: { mobile: { prefixes: ["7","8","9"], length: 7, format: "XXX XXXX" }, landline: { prefixes: ["3","6"], length: 7, format: "XXX XXXX" } } },
];

// ─── UTILITIES ─────────────────────────────────────────────────────────────────
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randDigit(n = 1) { return Array.from({ length: n }, () => String(rand(0, 9))).join(""); }

const SERVICE_META = {
  mobile:    { label: "Mobile",    icon: "📱", color: "#00ff88" },
  landline:  { label: "Landline",  icon: "☎️",  color: "#4fa3ff" },
  toll_free: { label: "Toll-Free", icon: "🆓",  color: "#ffd700" },
  premium:   { label: "Premium",   icon: "💎",  color: "#ff6b6b" },
  voip:      { label: "VoIP",      icon: "💻",  color: "#c084fc" },
  paging:    { label: "Paging",    icon: "📟",  color: "#fb923c" },
};

const REGIONS = ["All", "North America", "Latin America", "Western Europe", "Eastern Europe", "Middle East", "Africa", "Asia Pacific"];

function generateNumber(country, serviceType) {
  const svc = country.services[serviceType];
  if (!svc) return null;
  const prefix = svc.prefixes[rand(0, svc.prefixes.length - 1)];
  const remaining = svc.length - prefix.length;
  const digits = prefix + randDigit(Math.max(0, remaining));
  return `${country.dialCode}${digits}`;
}

const FLAG_EMOJIS = {};
COUNTRIES.forEach(c => {
  try {
    const pts = c.code.toUpperCase().split("").map(ch => 127397 + ch.charCodeAt(0));
    FLAG_EMOJIS[c.code] = String.fromCodePoint(...pts);
  } catch { FLAG_EMOJIS[c.code] = "🏳️"; }
});

// ─── COMPONENT ──────────────────────────────────────────────────────────────────
export default function PhoneGenerator() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === "US"));
  const [selectedService, setSelectedService] = useState("mobile");
  const [quantity, setQuantity] = useState(10);
  const [generated, setGenerated] = useState([]);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mixServices, setMixServices] = useState(false);

  const availableServices = Object.keys(selectedCountry.services);

  const filteredCountries = useMemo(() =>
    COUNTRIES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.includes(search) || c.code.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === "All" || c.region === regionFilter;
      return matchesSearch && matchesRegion;
    }), [search, regionFilter]);

  const handleCountryChange = (c) => {
    setSelectedCountry(c);
    setShowDropdown(false);
    setSearch("");
    if (!c.services[selectedService]) setSelectedService(Object.keys(c.services)[0]);
  };

  const generate = () => {
    const nums = Array.from({ length: Math.min(quantity, 10000) }, () => {
      if (mixServices) {
        const svc = availableServices[rand(0, availableServices.length - 1)];
        return { number: generateNumber(selectedCountry, svc), service: svc };
      }
      return { number: generateNumber(selectedCountry, selectedService), service: selectedService };
    }).filter(n => n.number);
    setGenerated(nums);
  };

  const downloadTXT = () => {
    const blob = new Blob([generated.map(n => n.number).join("\n")], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `phones_${selectedCountry.code}_${Date.now()}.txt`; a.click();
  };

  const downloadCSV = () => {
    const rows = generated.map(n =>
      `"${n.number}","${selectedCountry.name}","${selectedCountry.code}","${selectedCountry.dialCode}","${SERVICE_META[n.service]?.label || n.service}","${selectedCountry.region}"`
    );
    const blob = new Blob(["Phone Number,Country,Country Code,Dial Code,Service Type,Region\n" + rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `phones_${selectedCountry.code}_${Date.now()}.csv`; a.click();
  };

  const copyAll = () => {
    navigator.clipboard.writeText(generated.map(n => n.number).join("\n")).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  const breakdown = generated.reduce((acc, n) => { acc[n.service] = (acc[n.service] || 0) + 1; return acc; }, {});

  return (
    <div style={{ minHeight: "100vh", background: "#08080f", color: "#dde1f0", fontFamily: "'DM Mono','Fira Code','Courier New',monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#08080f;}::-webkit-scrollbar-thumb{background:#00ff88;border-radius:2px;}
        .glow{text-shadow:0 0 20px rgba(0,255,136,.7),0 0 40px rgba(0,255,136,.3);}
        .btn{background:transparent;border:1px solid #2a2a40;color:#666;padding:8px 16px;font-family:inherit;font-size:11px;letter-spacing:.1em;cursor:pointer;text-transform:uppercase;transition:all .15s;}
        .btn:hover{border-color:#00ff88;color:#00ff88;}
        .btn-sm{padding:6px 12px;font-size:10px;}
        .btn-active{border-color:currentColor!important;background:rgba(255,255,255,.05)!important;}
        .btn-gen{background:#00ff88;color:#08080f;font-weight:500;font-size:14px;padding:13px 32px;border:none;cursor:pointer;letter-spacing:.12em;text-transform:uppercase;transition:all .2s;font-family:inherit;width:100%;}
        .btn-gen:hover{box-shadow:0 0 24px rgba(0,255,136,.6);transform:translateY(-1px);}
        .input{background:#0d0d1c;border:1px solid #1e1e35;color:#dde1f0;padding:10px 13px;font-family:inherit;font-size:12px;outline:none;width:100%;transition:border-color .2s;}
        .input:focus{border-color:#00ff88;}
        .di{padding:9px 13px;cursor:pointer;display:flex;align-items:center;gap:9px;transition:background .1s;font-size:12px;}
        .di:hover{background:#1a1a2e;}
        .nr{padding:5px 12px;font-size:12px;border-bottom:1px solid #0e0e1c;display:flex;align-items:center;gap:10px;transition:background .1s;}
        .nr:hover{background:#0d0d1a;}
        .pill{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;font-size:9px;letter-spacing:.08em;text-transform:uppercase;border:1px solid currentColor;opacity:.65;}
        .sl{font-size:9px;letter-spacing:.25em;color:#00ff88;text-transform:uppercase;margin-bottom:8px;}
        .tgl{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:10px;color:#555;letter-spacing:.1em;text-transform:uppercase;user-select:none;}
        .tbox{width:26px;height:14px;border:1px solid #2a2a40;border-radius:7px;position:relative;transition:all .2s;}
        .tbox.on{border-color:#00ff88;background:rgba(0,255,136,.1);}
        .tdot{width:9px;height:9px;border-radius:50%;background:#2a2a40;position:absolute;top:1.5px;left:2px;transition:all .2s;}
        .tbox.on .tdot{background:#00ff88;transform:translateX(12px);}
        .region-btn{background:transparent;border:1px solid #1e1e35;color:#444;padding:4px 10px;font-family:inherit;font-size:9px;letter-spacing:.1em;cursor:pointer;text-transform:uppercase;transition:all .15s;}
        .region-btn:hover{border-color:#4fa3ff;color:#4fa3ff;}
        .region-btn.active{border-color:#4fa3ff;color:#4fa3ff;background:rgba(79,163,255,.08);}
        @keyframes fadeIn{from{opacity:0;transform:translateY(3px);}to{opacity:1;transform:none;}}
        .fi{animation:fadeIn .25s ease forwards;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        .cur{animation:blink 1.1s step-end infinite;}
      `}</style>

      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "32px 20px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 36, borderBottom: "1px solid #141428", paddingBottom: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(30px,5vw,54px)", letterSpacing: ".06em", lineHeight: 1, color: "#00ff88", marginBottom: 6 }} className="glow">
            PHONE<span style={{ color: "#dde1f0" }}>_</span>GEN<span className="cur">█</span>
          </div>
          <div style={{ color: "#2a2a40", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase" }}>
            Global Generator // {COUNTRIES.length} Countries // 8 Regions // Mobile · Landline · Toll-Free · Premium · VoIP · Paging
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>

          {/* LEFT PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Country Selector */}
            <div>
              <div className="sl">// Country <span style={{ color: "#333" }}>— {filteredCountries.length} shown</span></div>

              {/* Region Filter */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {REGIONS.map(r => (
                  <button key={r} className={`region-btn${regionFilter === r ? " active" : ""}`} onClick={() => setRegionFilter(r)}>
                    {r === "All" ? "All" : r.split(" ").map(w => w[0]).join("")}
                  </button>
                ))}
              </div>

              <div style={{ position: "relative" }}>
                <div onClick={() => setShowDropdown(!showDropdown)} style={{ background: "#0d0d1c", border: `1px solid ${showDropdown ? "#00ff88" : "#1e1e35"}`, padding: "10px 13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
                    <span style={{ fontSize: 17 }}>{FLAG_EMOJIS[selectedCountry.code]}</span>
                    {selectedCountry.name}
                    <span style={{ color: "#00ff88", fontSize: 10 }}>{selectedCountry.dialCode}</span>
                  </span>
                  <span style={{ color: "#333", fontSize: 8 }}>▼</span>
                </div>
                {showDropdown && (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#0d0d1c", border: "1px solid #1e1e35", borderTop: "none", zIndex: 50, maxHeight: 280, overflowY: "auto" }}>
                    <div style={{ padding: "7px", borderBottom: "1px solid #1e1e35" }}>
                      <input className="input" placeholder="Search country, dial code, code…" value={search} onChange={e => setSearch(e.target.value)} autoFocus style={{ padding: "7px 11px", fontSize: 11 }} />
                    </div>
                    {filteredCountries.map(c => (
                      <div key={c.code} className="di" onClick={() => handleCountryChange(c)}>
                        <span style={{ fontSize: 15 }}>{FLAG_EMOJIS[c.code]}</span>
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span style={{ color: "#444", fontSize: 9, marginRight: 6 }}>{c.region}</span>
                        <span style={{ color: "#00ff88", fontSize: 10 }}>{c.dialCode}</span>
                      </div>
                    ))}
                    {filteredCountries.length === 0 && <div style={{ padding: 12, color: "#333", fontSize: 11, textAlign: "center" }}>No results</div>}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 9, color: "#2a2a40", marginTop: 4, letterSpacing: ".1em" }}>
                {selectedCountry.region}
              </div>
            </div>

            {/* Service Type */}
            <div>
              <div className="sl">// Service Type</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {availableServices.map(svc => {
                  const m = SERVICE_META[svc] || { label: svc, icon: "📞", color: "#888" };
                  const active = selectedService === svc && !mixServices;
                  return (
                    <button key={svc} className={`btn btn-sm${active ? " btn-active" : ""}`} onClick={() => { setSelectedService(svc); setMixServices(false); }}
                      style={{ color: active ? m.color : "#444", borderColor: active ? m.color : "#2a2a40" }}>
                      {m.icon} {m.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 10 }}>
                <label className="tgl" onClick={() => setMixServices(v => !v)}>
                  <div className={`tbox${mixServices ? " on" : ""}`}><div className="tdot" /></div>
                  Mix all service types randomly
                </label>
              </div>
            </div>

            {/* Service Info */}
            {!mixServices && selectedCountry.services[selectedService] && (() => {
              const s = selectedCountry.services[selectedService];
              const m = SERVICE_META[selectedService] || { label: selectedService, icon: "📞", color: "#888" };
              return (
                <div className="fi" style={{ background: "#0d0d1c", border: "1px solid #1e1e35", padding: "11px 13px", fontSize: 10, lineHeight: 2.1, color: "#444" }}>
                  <div><span style={{ color: "#222" }}>SERVICE   </span><span style={{ color: m.color }}>{m.icon} {m.label}</span></div>
                  <div><span style={{ color: "#222" }}>FORMAT    </span><span style={{ color: "#dde1f0" }}>{s.format}</span></div>
                  <div><span style={{ color: "#222" }}>DIGITS    </span><span style={{ color: "#dde1f0" }}>{s.length}</span></div>
                  <div><span style={{ color: "#222" }}>PREFIXES  </span><span style={{ color: "#dde1f0" }}>{s.prefixes.slice(0, 6).join(", ")}{s.prefixes.length > 6 ? ` +${s.prefixes.length - 6} more` : ""}</span></div>
                </div>
              );
            })()}

            {/* Quantity */}
            <div>
              <div className="sl">// Quantity (max 10,000)</div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <input className="input" type="number" min={1} max={10000} value={quantity} onChange={e => setQuantity(Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))} style={{ width: 90 }} />
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 10, 100, 1000].map(q => <button key={q} className="btn btn-sm" onClick={() => setQuantity(q)}>{q}</button>)}
                </div>
              </div>
            </div>

            {/* Generate */}
            <button className="btn-gen" onClick={generate}>
              ⚡ Generate {quantity > 1 ? `${quantity.toLocaleString()} Numbers` : "Number"}
            </button>

            {/* Export */}
            {generated.length > 0 && (
              <div className="fi" style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <button className="btn btn-sm" onClick={downloadTXT}>↓ TXT</button>
                <button className="btn btn-sm" onClick={downloadCSV}>↓ CSV</button>
                <button className="btn btn-sm" onClick={copyAll} style={copied ? { borderColor: "#00ff88", color: "#00ff88" } : {}}>{copied ? "✓ Copied!" : "⎘ Copy All"}</button>
                <button className="btn btn-sm" onClick={() => setGenerated([])}>✕ Clear</button>
              </div>
            )}

            {/* Breakdown */}
            {generated.length > 0 && Object.keys(breakdown).length > 0 && (
              <div className="fi" style={{ background: "#0d0d1c", border: "1px solid #1e1e35", padding: "11px 13px", fontSize: 10 }}>
                <div className="sl" style={{ marginBottom: 6 }}>// Breakdown</div>
                {Object.entries(breakdown).map(([svc, cnt]) => {
                  const m = SERVICE_META[svc] || { label: svc, icon: "📞", color: "#888" };
                  const pct = Math.round(cnt / generated.length * 100);
                  return (
                    <div key={svc} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ color: m.color }}>{m.icon} {m.label}</span>
                        <span style={{ color: "#dde1f0" }}>{cnt.toLocaleString()} <span style={{ color: "#333" }}>({pct}%)</span></span>
                      </div>
                      <div style={{ height: 2, background: "#1e1e35", borderRadius: 1 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: m.color, borderRadius: 1, transition: "width .4s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div className="sl" style={{ marginBottom: 0 }}>// Output</div>
              {generated.length > 0 && <span style={{ color: "#2a2a40", fontSize: 9 }}>{generated.length.toLocaleString()} records</span>}
            </div>
            <div style={{ background: "#06060c", border: "1px solid #111120", height: 600, overflowY: "auto" }}>
              {generated.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#161622", fontSize: 10, gap: 10, textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 48, opacity: .1 }}>📞</div>
                  <div style={{ letterSpacing: ".15em" }}>AWAITING GENERATION</div>
                  <div style={{ fontSize: 9, opacity: .5 }}>Select a country, service type &amp; quantity</div>
                </div>
              ) : (
                generated.map((n, i) => {
                  const m = SERVICE_META[n.service] || { label: n.service, icon: "📞", color: "#888" };
                  return (
                    <div key={i} className="nr">
                      <span style={{ color: "#1c1c2c", fontSize: 9, minWidth: 30, textAlign: "right" }}>{i + 1}</span>
                      <span style={{ color: m.color, letterSpacing: ".06em", flex: 1 }}>{n.number}</span>
                      <span className="pill" style={{ color: m.color }}>{m.icon} {m.label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 36, paddingTop: 18, borderTop: "1px solid #0d0d1c", fontSize: 9, color: "#161622", letterSpacing: ".15em", display: "flex", justifyContent: "space-between", textTransform: "uppercase" }}>
          <span>Phone_Gen v3.0 // For Testing &amp; Development Purposes Only</span>
          <span>{COUNTRIES.length} Countries // 8 Regions // 6 Service Types</span>
        </div>
      </div>
    </div>
  );
}
