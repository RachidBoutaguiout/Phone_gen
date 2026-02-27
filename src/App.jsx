import { useState, useMemo } from "react";

const COUNTRIES = [
  { name: "United States", code: "US", dialCode: "+1", services: { mobile: { prefixes: ["201","202","203","204","205","206","207","208","209","210","212","213","214","215","216","217","218","219","224","225","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","272","281","301","302","303","304","305","307","309","310","312","313","314","315","316","317","318","319","321","323","325","330","331","334","336","337","346","347","352","360","361","385","386","401","402","404","405","406","407","408","409","410","412","413","414","415","417","419","423","424","425","432","434","435","440","442","443","469","470","475","478","479","480","484","501","502","503","504","505","507","508","510","512","513","515","516","517","518","520","530","539","540","541","551","559","561","562","563","567","570","571","573","574","575","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","628","630","631","636","641","646","650","651","657","660","661","662","667","669","678","681","682","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","727","731","732","734","737","740","754","757","760","762","763","765","769","770","772","773","774","775","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","828","830","831","832","843","845","847","848","850","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","929","930","931","936","937","938","940","941","947","949","951","952","954","956","970","971","972","973","978","979","980","984","985","989"], length: 10, format: "(NXX) NXX-XXXX" }, landline: { prefixes: ["212","213","312","404","415","617","702","713","718","770","858","901","904","949"], length: 10, format: "(NXX) NXX-XXXX" }, toll_free: { prefixes: ["800","844","855","866","877","888"], length: 10, format: "1-8XX-NXX-XXXX" }, premium: { prefixes: ["900"], length: 10, format: "1-900-NXX-XXXX" }, voip: { prefixes: ["203","312","415","512","646","702","720","857"], length: 10, format: "(NXX) NXX-XXXX" }, paging: { prefixes: ["369","638","985"], length: 10, format: "(NXX) NXX-XXXX" } } },
  { name: "United Kingdom", code: "GB", dialCode: "+44", services: { mobile: { prefixes: ["7400","7500","7600","7700","7800","7900","7450","7550","7650","7750","7850","7950"], length: 10, format: "07XXX XXXXXX" }, landline: { prefixes: ["20","121","131","141","151","161","113","114","115","116","117","118"], length: 10, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800","808"], length: 10, format: "0800 XXX XXXX" }, premium: { prefixes: ["906","909","982","983"], length: 10, format: "09XX XXX XXXX" }, voip: { prefixes: ["56","30"], length: 10, format: "056 XXXX XXXX" }, paging: { prefixes: ["76"], length: 10, format: "076X XXXXXX" } } },
  { name: "France", code: "FR", dialCode: "+33", services: { mobile: { prefixes: ["6","7"], length: 9, format: "0X XX XX XX XX" }, landline: { prefixes: ["1","2","3","4","5"], length: 9, format: "0X XX XX XX XX" }, toll_free: { prefixes: ["800","805","809"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["892","899"], length: 9, format: "089X XX XX XX" }, voip: { prefixes: ["9"], length: 9, format: "09 XX XX XX XX" } } },
  { name: "Germany", code: "DE", dialCode: "+49", services: { mobile: { prefixes: ["15","16","17"], length: 11, format: "0XXX XXXXXXXX" }, landline: { prefixes: ["30","40","69","89","211","221","231","341","351","511","621","711"], length: 11, format: "0XXX XXXXXXXX" }, toll_free: { prefixes: ["800"], length: 11, format: "0800 XXXXXXX" }, premium: { prefixes: ["900","901"], length: 11, format: "0900 XXXXXXX" }, voip: { prefixes: ["32"], length: 11, format: "032X XXXXXXXX" } } },
  { name: "Canada", code: "CA", dialCode: "+1", services: { mobile: { prefixes: ["403","416","418","430","431","437","438","450","506","514","519","548","579","581","587","604","613","647","672","705","709","778","780","782","807","819","825","867","873","902","905"], length: 10, format: "(NXX) NXX-XXXX" }, landline: { prefixes: ["416","514","604","780","613","902","709","807"], length: 10, format: "(NXX) NXX-XXXX" }, toll_free: { prefixes: ["800","833","844","855","866","877","888"], length: 10, format: "1-8XX-NXX-XXXX" } } },
  { name: "Australia", code: "AU", dialCode: "+61", services: { mobile: { prefixes: ["4"], length: 9, format: "04XX XXX XXX" }, landline: { prefixes: ["2","3","7","8"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900 XXX XXX" }, voip: { prefixes: ["550"], length: 10, format: "0550 XXX XXX" } } },
  { name: "India", code: "IN", dialCode: "+91", services: { mobile: { prefixes: ["6","7","8","9"], length: 10, format: "XXXXX XXXXX" }, landline: { prefixes: ["11","22","33","44","40","80","20"], length: 10, format: "0XX-XXXXXXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800-XXX-XXXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900-XXX-XXXX" }, voip: { prefixes: ["70","80"], length: 10, format: "XXXXX XXXXX" } } },
  { name: "China", code: "CN", dialCode: "+86", services: { mobile: { prefixes: ["130","131","132","133","134","135","136","137","138","139","145","150","151","152","153","155","156","157","158","159","166","170","171","172","173","175","176","177","178","180","181","182","183","184","185","186","187","188","189","191","198","199"], length: 11, format: "XXX XXXX XXXX" }, landline: { prefixes: ["10","20","21","22","23","24","25","27","28","29"], length: 11, format: "0XXX XXXXXXXX" }, toll_free: { prefixes: ["400","800"], length: 10, format: "400 XXX XXXX" }, voip: { prefixes: ["17"], length: 11, format: "17X XXXX XXXX" } } },
  { name: "Japan", code: "JP", dialCode: "+81", services: { mobile: { prefixes: ["70","80","90"], length: 10, format: "0XX-XXXX-XXXX" }, landline: { prefixes: ["3","6","11","22","52","75","92"], length: 10, format: "0X-XXXX-XXXX" }, toll_free: { prefixes: ["120","800"], length: 10, format: "0120-XXX-XXX" }, premium: { prefixes: ["990"], length: 10, format: "0990-XX-XXXX" }, voip: { prefixes: ["50"], length: 10, format: "050-XXXX-XXXX" } } },
  { name: "Brazil", code: "BR", dialCode: "+55", services: { mobile: { prefixes: ["119","219","319","419","519","619","719","819","919"], length: 11, format: "(XX) 9XXXX-XXXX" }, landline: { prefixes: ["11","21","31","41","51","61","71","81","91","12","13","14","15","16","17","18","19"], length: 10, format: "(XX) XXXX-XXXX" }, toll_free: { prefixes: ["800"], length: 11, format: "0800 XXX XXXX" }, premium: { prefixes: ["900"], length: 11, format: "0900 XXX XXXX" } } },
  { name: "Russia", code: "RU", dialCode: "+7", services: { mobile: { prefixes: ["900","901","902","903","904","905","906","908","909","910","911","912","913","914","915","916","917","918","919","920","921","922","923","924","925","926","927","928","929","950","951","952","953","954","955","960","961","962","963","964","965","966","967","968","969","977","978","980","981","982","983","984","985","986","987","988","989"], length: 10, format: "8 (XXX) XXX-XX-XX" }, landline: { prefixes: ["495","499","812","343","383","863","846","831","391","351","473"], length: 10, format: "8 (XXX) XXX-XX-XX" }, toll_free: { prefixes: ["800"], length: 10, format: "8-800-XXX-XX-XX" }, premium: { prefixes: ["809"], length: 10, format: "8-809-XXX-XXXX" } } },
  { name: "Mexico", code: "MX", dialCode: "+52", services: { mobile: { prefixes: ["55","33","81","664","665","667","668","669","670","686","687","688","689","690","691","692","693","694","695","696","697","698","699","700"], length: 10, format: "XX XXXX XXXX" }, landline: { prefixes: ["55","33","81","222","229","271","272","273","274","275","276","277","278","279"], length: 10, format: "XX XXXX XXXX" }, toll_free: { prefixes: ["800","888"], length: 10, format: "800 XXX XXXX" } } },
  { name: "Spain", code: "ES", dialCode: "+34", services: { mobile: { prefixes: ["6","7"], length: 9, format: "XXX XXX XXX" }, landline: { prefixes: ["91","93","94","95","96","971","972","973","974","975","976","977","978","979","980","981","982","983","984","985","986","987","988","989"], length: 9, format: "XXX XXX XXX" }, toll_free: { prefixes: ["800","900"], length: 9, format: "900 XXX XXX" }, premium: { prefixes: ["803","806","807","905","907"], length: 9, format: "90X XXX XXX" }, voip: { prefixes: ["51","52","53","54","55","56","57","58","59"], length: 9, format: "5XX XXX XXX" } } },
  { name: "Italy", code: "IT", dialCode: "+39", services: { mobile: { prefixes: ["3"], length: 10, format: "3XX XXX XXXX" }, landline: { prefixes: ["02","06","011","041","051","055","081","091"], length: 9, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800","803"], length: 9, format: "800 XXXXXX" }, premium: { prefixes: ["899","166"], length: 9, format: "899 XXXXXX" }, voip: { prefixes: ["178","179"], length: 9, format: "178 XXXXXX" } } },
  { name: "Netherlands", code: "NL", dialCode: "+31", services: { mobile: { prefixes: ["6"], length: 9, format: "06 XXXX XXXX" }, landline: { prefixes: ["10","20","30","40","50","70","75","76","77","78","79","88"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXXX" }, premium: { prefixes: ["900","906","909"], length: 9, format: "0900 XXXXXXX" }, voip: { prefixes: ["85","87"], length: 9, format: "085 XXX XXXX" } } },
  { name: "Belgium", code: "BE", dialCode: "+32", services: { mobile: { prefixes: ["456","460","465","470","475","477","478","479","480","484","485","486","487","488","489","490","491","492","493","494","495","496","497","498","499"], length: 9, format: "04XX XX XX XX" }, landline: { prefixes: ["2","3","4","9","10","11","12","13","14","15","16","19","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","67","68","69","71","80","81","82","83","84","85","86","87","89"], length: 9, format: "0XX XX XX XX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XX XXX" }, premium: { prefixes: ["900","902","905","906","909"], length: 9, format: "0900 XX XXX" } } },
  { name: "Sweden", code: "SE", dialCode: "+46", services: { mobile: { prefixes: ["70","72","73","76","79"], length: 9, format: "07X XXX XXXX" }, landline: { prefixes: ["8","11","13","16","18","19","21","23","26","31","33","35","36","40","42","44","46","54","60","63","90"], length: 9, format: "0XX XX XX XX" }, toll_free: { prefixes: ["20"], length: 9, format: "020 XX XX XX" }, premium: { prefixes: ["900","939","944"], length: 9, format: "0900 XX XXX" } } },
  { name: "Switzerland", code: "CH", dialCode: "+41", services: { mobile: { prefixes: ["74","75","76","77","78","79"], length: 9, format: "07X XXX XX XX" }, landline: { prefixes: ["21","22","26","27","31","32","33","34","41","43","44","51","52","55","56","58","61","62","71","81","91"], length: 9, format: "0XX XXX XX XX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900","901","906"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Poland", code: "PL", dialCode: "+48", services: { mobile: { prefixes: ["45","50","51","53","57","60","66","69","72","73","78","79","88"], length: 9, format: "XXX XXX XXX" }, landline: { prefixes: ["12","13","14","15","16","17","18","22","23","24","25","29","32","33","34","43","44","46","48","52","54","55","56","58","59","61","62","63","65","67","68","71","74","75","76","77","81","82","83","84","85","86","87","89","91","94","95"], length: 9, format: "XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" }, premium: { prefixes: ["700","702","703","707","708","709"], length: 9, format: "70X XXX XXX" } } },
  { name: "South Korea", code: "KR", dialCode: "+82", services: { mobile: { prefixes: ["10","16","17","18","19"], length: 10, format: "010-XXXX-XXXX" }, landline: { prefixes: ["2","31","32","33","41","42","43","44","51","52","53","54","55","61","62","63","64"], length: 9, format: "0X-XXXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800-XXX-XXXX" }, premium: { prefixes: ["700","060"], length: 10, format: "0700-XXX-XXXX" }, voip: { prefixes: ["70"], length: 10, format: "070-XXXX-XXXX" } } },
  { name: "South Africa", code: "ZA", dialCode: "+27", services: { mobile: { prefixes: ["60","61","62","63","64","65","66","67","68","71","72","73","74","76","78","79","81","82","83","84","85","87"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["10","11","12","13","14","15","16","17","18","21","22","23","31","32","33","34","35","39","40","41","42","43","44","45","46","47","48","49","51","53","54","56","57","58","59"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["861","862","863","864","865","866","867","868","869"], length: 9, format: "086X XXX XXX" } } },
  { name: "Nigeria", code: "NG", dialCode: "+234", services: { mobile: { prefixes: ["701","702","703","704","705","706","707","708","709","802","803","804","805","806","807","808","809","810","811","812","813","814","815","816","817","818","819","901","902","903","904","905","906","907","908","909","912","913","914","915","916","917","918","919"], length: 10, format: "0XXX XXX XXXX" }, landline: { prefixes: ["1","2","3","4","5","6","7","8","9"], length: 8, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Turkey", code: "TR", dialCode: "+90", services: { mobile: { prefixes: ["501","505","506","507","530","531","532","533","534","535","536","537","538","539","540","541","542","543","544","545","546","547","548","549","550","551","552","553","554","555","556","557","558","559","561","562","563","564","565","570","571","572","573","576","579"], length: 10, format: "0XXX XXX XXXX" }, landline: { prefixes: ["212","216","232","242","252","256","258","262","264","266","272","274","276","282","284","286","288","312","318","322","324","326","328","332","338","342","344","346","348","352","354","356","358","362","364","366","368","370","372","374","376","378","380","382","384","386","388","392","394","396","398","412","414","416","418","422","424","426","428","432","434","436","438","442","444","446","448","452","454","456","458","462","464","466","468","472","474","476","478","482","484","486","488"], length: 10, format: "0XXX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" }, premium: { prefixes: ["900","901","902"], length: 10, format: "0900 XXX XXXX" } } },
  { name: "Argentina", code: "AR", dialCode: "+54", services: { mobile: { prefixes: ["911","919","921","929","931","939","941","949","951","959","961","969","971","979","981","989","991","999"], length: 10, format: "0XX 15-XXXX-XXXX" }, landline: { prefixes: ["11","221","223","260","261","264","280","291","294","296","297","299","341","351","381","383","385","387","388","389"], length: 10, format: "0XX XXXX-XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", services: { mobile: { prefixes: ["50","53","54","55","56","57","58","59"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["11","12","13","14","16","17"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "800 XXX XXXX" } } },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", services: { mobile: { prefixes: ["50","52","54","55","56","58"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["2","3","4","6","7","9"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXXXXX" } } },
  { name: "Egypt", code: "EG", dialCode: "+20", services: { mobile: { prefixes: ["10","11","12","15"], length: 10, format: "01X XXXX XXXX" }, landline: { prefixes: ["2","3","13","40","45","46","47","48","50","55","57","62","64","65","66","68","69","82","84","86","88","92","93","95","96","97"], length: 9, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Pakistan", code: "PK", dialCode: "+92", services: { mobile: { prefixes: ["300","301","302","303","304","305","306","307","308","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349"], length: 10, format: "0XXX XXXXXXX" }, landline: { prefixes: ["21","22","41","42","51","52","55","61","62","71","81","91","92"], length: 9, format: "0XX XXXXXXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "0800 XXXXX" } } },
  { name: "Indonesia", code: "ID", dialCode: "+62", services: { mobile: { prefixes: ["811","812","813","814","815","816","817","818","819","821","822","823","828","851","852","853","855","856","857","858","877","878","881","882","883","884","885","886","887","888","889","896","897","898","899"], length: 12, format: "08XX XXXX XXXX" }, landline: { prefixes: ["21","22","24","31","61","65","711","717","721","726","731","741","751","761","771","778","780"], length: 10, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["800","803","804"], length: 10, format: "0800 XXX XXXX" } } },
  { name: "Malaysia", code: "MY", dialCode: "+60", services: { mobile: { prefixes: ["10","11","12","13","14","16","17","18","19"], length: 10, format: "0XX XXXX XXXX" }, landline: { prefixes: ["3","4","5","6","7","9","82","83","84","85","86","87","88","89"], length: 9, format: "0X-XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XX XXXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900 XX XXXX" } } },
  { name: "Thailand", code: "TH", dialCode: "+66", services: { mobile: { prefixes: ["6","8","9"], length: 9, format: "0X XXXX XXXX" }, landline: { prefixes: ["2","3","4","5","7"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["190","900"], length: 9, format: "1900 XXX XXX" } } },
  { name: "Vietnam", code: "VN", dialCode: "+84", services: { mobile: { prefixes: ["32","33","34","35","36","37","38","39","56","58","70","76","77","78","79","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XXX XXX XXX" }, landline: { prefixes: ["24","28","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","238","239"], length: 9, format: "0XX XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXX" } } },
  { name: "Philippines", code: "PH", dialCode: "+63", services: { mobile: { prefixes: ["905","906","907","908","909","910","911","912","913","915","916","917","918","919","920","921","922","923","925","926","927","928","929","930","931","932","933","934","935","936","937","938","939","942","943","944","945","946","947","948","949","950","951","952","953","954","955","956","957","958","959","961","963","964","965","966","967","970","971","972","973","974","975","976","977","978","979","980","981","982","983","984","985","986","987","988","989","990","991","992","993","994","995","996","997","998","999"], length: 10, format: "0XXX XXX XXXX" }, landline: { prefixes: ["2","32","33","34","35","36","38","42","43","44","45","46","47","48","49","52","53","54","55","56","62","63","64","65","68","72","74","75","77","82","83","84","85","86","87","88","89"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXXXXXX" } } },
  { name: "Singapore", code: "SG", dialCode: "+65", services: { mobile: { prefixes: ["8","9"], length: 8, format: "XXXX XXXX" }, landline: { prefixes: ["6"], length: 8, format: "XXXX XXXX" }, toll_free: { prefixes: ["1800"], length: 10, format: "1800 XXX XXXX" }, premium: { prefixes: ["1900"], length: 10, format: "1900 XXX XXXX" } } },
  { name: "Kenya", code: "KE", dialCode: "+254", services: { mobile: { prefixes: ["70","71","72","74","75","76","77","78","79","110","111","112","113","114","115","116","117","118","119"], length: 9, format: "07XX XXX XXX" }, landline: { prefixes: ["20","40","41","42","43","44","45","46","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69"], length: 9, format: "0XX XXXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" } } },
  { name: "Portugal", code: "PT", dialCode: "+351", services: { mobile: { prefixes: ["91","92","93","96"], length: 9, format: "9XX XXX XXX" }, landline: { prefixes: ["21","22","231","232","233","234","235","236","238","239","241","242","243","244","245","249","251","252","253","254","255","256","258","259","261","262","263","265","266","268","269","271","272","273","274","275","276","277","278","279","281","282","283","284","285","286","289","291","292","295","296","298","299"], length: 9, format: "2XX XXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" }, premium: { prefixes: ["707","708","760","761","762","763","764","765","766","767","768","769"], length: 9, format: "7XX XXX XXX" }, voip: { prefixes: ["30"], length: 9, format: "30X XXX XXX" } } },
  { name: "Norway", code: "NO", dialCode: "+47", services: { mobile: { prefixes: ["4","9"], length: 8, format: "XXX XX XXX" }, landline: { prefixes: ["2","3","5","6","7"], length: 8, format: "XX XX XX XX" }, toll_free: { prefixes: ["800"], length: 8, format: "800 X XXXX" }, premium: { prefixes: ["820","829","844","848","877"], length: 8, format: "82X XX XXX" } } },
  { name: "Denmark", code: "DK", dialCode: "+45", services: { mobile: { prefixes: ["2","3","4","5","6","7","8","9"], length: 8, format: "XX XX XX XX" }, landline: { prefixes: ["32","33","35","36","38","39","42","43","44","45","46","47","48","49","52","53","54","55","56","57","58","59","62","63","64","65","66","74","75","76","86","87","89","96","97","98","99"], length: 8, format: "XX XX XX XX" }, toll_free: { prefixes: ["80"], length: 8, format: "80 XX XX XX" }, premium: { prefixes: ["90"], length: 8, format: "90 XX XX XX" } } },
  { name: "Finland", code: "FI", dialCode: "+358", services: { mobile: { prefixes: ["40","41","42","43","44","45","46","50"], length: 9, format: "04X XXX XXXX" }, landline: { prefixes: ["2","3","5","6","8","9","13","14","15","16","17","18","19"], length: 9, format: "0X XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXX" }, premium: { prefixes: ["700","600"], length: 9, format: "0700 XXXXXX" } } },
  { name: "Greece", code: "GR", dialCode: "+30", services: { mobile: { prefixes: ["690","691","693","694","695","697","698","699"], length: 10, format: "69X XXX XXXX" }, landline: { prefixes: ["21","22","23","24","25","26","27","28"], length: 10, format: "2XX XXXX XXXX" }, toll_free: { prefixes: ["800"], length: 10, format: "800 XXX XXXX" }, premium: { prefixes: ["901","902","903","904","905","906","907","908","909"], length: 10, format: "90X XXX XXXX" } } },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", services: { mobile: { prefixes: ["601","602","603","604","605","606","607","608","702","720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","736","737","738","739","770","771","772","773","774","775","776","777","778","779","790","791","792","793","794","795","796","797","798","799"], length: 9, format: "XXX XXX XXX" }, landline: { prefixes: ["2","35","37","38","39","46","47","48","49","51","53","54","55","56","57","58","59"], length: 9, format: "XXX XXX XXX" }, toll_free: { prefixes: ["800"], length: 9, format: "800 XXX XXX" }, premium: { prefixes: ["900","906","907","908","909"], length: 9, format: "900 XXX XXX" } } },
  { name: "Romania", code: "RO", dialCode: "+40", services: { mobile: { prefixes: ["720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","736","737","738","739","740","741","742","743","744","745","746","747","748","749","750","751","752","753","754","755","756","757","758","759","760","761","762","763","764","765","766","767","768","769","770","771","772","773","774","775","776","777","778","779"], length: 9, format: "0XXX XXX XXX" }, landline: { prefixes: ["21","23","24","25","26","27","28","31","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900","903","906","907","908","909"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Israel", code: "IL", dialCode: "+972", services: { mobile: { prefixes: ["50","52","53","54","55","57","58"], length: 9, format: "05X XXX XXXX" }, landline: { prefixes: ["2","3","4","8","9"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["1800","1700"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["1900","1905"], length: 10, format: "1900 XXX XXX" }, voip: { prefixes: ["72","73","76","77","78","79"], length: 9, format: "07X XXXX XXX" } } },
  { name: "Morocco", code: "MA", dialCode: "+212", services: { mobile: { prefixes: ["60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79"], length: 9, format: "0X XX XX XX XX" }, landline: { prefixes: ["52","53","54","55","56","57","58"], length: 9, format: "05X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXXXXX" } } },
  { name: "Ukraine", code: "UA", dialCode: "+380", services: { mobile: { prefixes: ["50","63","66","67","68","73","91","92","93","94","95","96","97","98","99"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["44","32","57","61","62","48","56","46","41","55","45","43","47","53","64","66"], length: 9, format: "0XX XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XX XXXX" } } },
  { name: "New Zealand", code: "NZ", dialCode: "+64", services: { mobile: { prefixes: ["20","21","22","27","28","29"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["3","4","6","7","9"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["800"], length: 9, format: "0800 XXX XXX" }, premium: { prefixes: ["900"], length: 9, format: "0900 XXX XXX" } } },
  { name: "Ireland", code: "IE", dialCode: "+353", services: { mobile: { prefixes: ["83","85","86","87","89"], length: 9, format: "08X XXX XXXX" }, landline: { prefixes: ["1","21","22","23","24","25","26","27","28","29","40","41","42","43","44","45","46","47","48","49","51","52","53","54","55","56","57","58","59","61","62","63","64","65","66","67","68","69","71","72","73","74","75","76","90","91","92","93","94","95","96","97","98","99"], length: 9, format: "0X XX XX XX XX" }, toll_free: { prefixes: ["1800","1850"], length: 10, format: "1800 XXX XXX" }, premium: { prefixes: ["1550","1570","1580","1590"], length: 10, format: "1550 XXX XXX" } } },
  { name: "Hungary", code: "HU", dialCode: "+36", services: { mobile: { prefixes: ["20","30","31","50","51","52","53","54","55","56","57","58","59","70"], length: 9, format: "0XX XXX XXXX" }, landline: { prefixes: ["1","22","23","24","25","26","27","28","29","32","33","34","35","36","37","38","39","42","44","45","46","47","48","49","52","53","54","55","56","57","58","59","62","63","64","66","67","68","69","72","73","74","75","76","77","78","79","82","83","84","85","87","88","89","92","93","94","95","96","98","99"], length: 9, format: "0X XXX XXXX" }, toll_free: { prefixes: ["80"], length: 9, format: "080 XXX XXX" }, premium: { prefixes: ["90"], length: 9, format: "090 XXX XXX" } } },
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
  const pts = c.code.toUpperCase().split("").map(ch => 127397 + ch.charCodeAt(0));
  FLAG_EMOJIS[c.code] = String.fromCodePoint(...pts);
});

// ─── COMPONENT ──────────────────────────────────────────────────────────────────
export default function PhoneGenerator() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === "US"));
  const [selectedService, setSelectedService] = useState("mobile");
  const [quantity, setQuantity] = useState(10);
  const [generated, setGenerated] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mixServices, setMixServices] = useState(false);

  const availableServices = Object.keys(selectedCountry.services);

  const filteredCountries = useMemo(() =>
    COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    ), [search]);

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
      `"${n.number}","${selectedCountry.name}","${selectedCountry.code}","${selectedCountry.dialCode}","${SERVICE_META[n.service]?.label || n.service}"`
    );
    const blob = new Blob(["Phone Number,Country,Country Code,Dial Code,Service Type\n" + rows.join("\n")], { type: "text/csv" });
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
        @keyframes fadeIn{from{opacity:0;transform:translateY(3px);}to{opacity:1;transform:none;}}
        .fi{animation:fadeIn .25s ease forwards;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        .cur{animation:blink 1.1s step-end infinite;}
      `}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 36, borderBottom: "1px solid #141428", paddingBottom: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(30px,5vw,54px)", letterSpacing: ".06em", lineHeight: 1, color: "#00ff88", marginBottom: 6 }} className="glow">
            PHONE<span style={{ color: "#dde1f0" }}>_</span>GEN<span className="cur">█</span>
          </div>
          <div style={{ color: "#2a2a40", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase" }}>
            Global Generator // {COUNTRIES.length} Countries // Mobile · Landline · Toll-Free · Premium · VoIP · Paging
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>

          {/* LEFT PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Country Selector */}
            <div>
              <div className="sl">// Country</div>
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
                      <input className="input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} autoFocus style={{ padding: "7px 11px", fontSize: 11 }} />
                    </div>
                    {filteredCountries.map(c => (
                      <div key={c.code} className="di" onClick={() => handleCountryChange(c)}>
                        <span style={{ fontSize: 15 }}>{FLAG_EMOJIS[c.code]}</span>
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span style={{ color: "#00ff88", fontSize: 10 }}>{c.dialCode}</span>
                      </div>
                    ))}
                    {filteredCountries.length === 0 && <div style={{ padding: 12, color: "#333", fontSize: 11, textAlign: "center" }}>No results</div>}
                  </div>
                )}
              </div>
            </div>

            {/* Service Type Buttons */}
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

            {/* Service Info Card */}
            {!mixServices && selectedCountry.services[selectedService] && (() => {
              const s = selectedCountry.services[selectedService];
              const m = SERVICE_META[selectedService] || { label: selectedService, icon: "📞", color: "#888" };
              return (
                <div className="fi" style={{ background: "#0d0d1c", border: "1px solid #1e1e35", padding: "11px 13px", fontSize: 10, lineHeight: 2.1, color: "#444" }}>
                  <div><span style={{ color: "#222" }}>SERVICE   </span><span style={{ color: m.color }}>{m.icon} {m.label}</span></div>
                  <div><span style={{ color: "#222" }}>FORMAT    </span><span style={{ color: "#dde1f0" }}>{s.format}</span></div>
                  <div><span style={{ color: "#222" }}>DIGITS    </span><span style={{ color: "#dde1f0" }}>{s.length}</span></div>
                  <div><span style={{ color: "#222" }}>PREFIXES  </span><span style={{ color: "#dde1f0" }}>{s.prefixes.slice(0, 7).join(", ")}{s.prefixes.length > 7 ? ` +${s.prefixes.length - 7} more` : ""}</span></div>
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
            <div style={{ background: "#06060c", border: "1px solid #111120", height: 580, overflowY: "auto" }}>
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
          <span>Phone_Gen v2.0 // For Testing &amp; Development Purposes Only</span>
          <span>{COUNTRIES.length} Countries // 6 Service Types</span>
        </div>
      </div>
    </div>
  );
}
