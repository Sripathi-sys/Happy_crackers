// Wholesale Crackers Data and Logic - Happy Enjoy Crackers

// 185 wholesale products data verified from the PDF Price List
const wholesaleProducts = [
  // Page 2: ONE SOUND CRACKERS
  { sno: 1, name: "2 3/4 KURUVI", tamilName: "2 3/4 குருவி", regularPrice: 80, discountedPrice: 8, unit: "1 Pkt", image: "assets/products/pro1.jpg" },
  { sno: 2, name: "2 3/4 KURUVI (Machine Fuse)", tamilName: "2 3/4 குருவி", regularPrice: 150, discountedPrice: 15, unit: "1 Pkt", image: "assets/products/pro2.jpg" },
  { sno: 3, name: "3 1/4 LAKSHMI", tamilName: "லட்சுமி", regularPrice: 150, discountedPrice: 15, unit: "1 Pkt", image: "assets/products/pro3.webp" },
  { sno: 4, name: "4\" LAKSHMI", tamilName: "4 லட்சுமி", regularPrice: 200, discountedPrice: 20, unit: "1 Pkt", image: "assets/products/pro4.jpg" },
  { sno: 5, name: "4\"DLX LAKSHMI", tamilName: "4 டீலக்ஸ் லட்சுமி", regularPrice: 340, discountedPrice: 34, unit: "1 Pkt", image: "assets/products/pro5.jpg" },
  { sno: 6, name: "4\" GOLD LAKSHMI", tamilName: "4 கோல்டு லட்சுமி", regularPrice: 360, discountedPrice: 36, unit: "1 Pkt", image: "assets/products/pro6.jpg" },
  { sno: 7, name: "2 SOUND CRACKERS", tamilName: "2 சவுண்ட் வெடி", regularPrice: 410, discountedPrice: 41, unit: "1 Pkt", image: "assets/products/pro7.jpg" },
  { sno: 8, name: "KUMKI 4ML 12 PLUS", tamilName: "கும்கி 4 எம்மல் 12 பிலஸ்", regularPrice: 500, discountedPrice: 50, unit: "1 Pkt", image: "assets/products/pro8.jpg" },
  { sno: 9, name: "4.5 INCH BAHUBALI PLUS", tamilName: "4.5 இன்ச் பகுபலி பிலஸ்", regularPrice: 600, discountedPrice: 60, unit: "1 Pkt", image: "assets/images/star-logo.png" },
  { sno: 10, name: "5 INCH 20 PLUS", tamilName: "5 இன்ச் 20 பிலஸ்", regularPrice: 700, discountedPrice: 70, unit: "1 Pkt", image: "assets/images/star-logo.png" },
  { sno: 11, name: "LION 6 INCH 24 PLUS", tamilName: "லயன் 6 இன்ச் 24 பிலஸ்", regularPrice: 800, discountedPrice: 80, unit: "1 Pkt", image: "assets/images/star-logo.png" },

  // Page 3: GROUND CHUKKAR & FLOWER POTS & BOMB
  { sno: 12, name: "G.C.BIG", tamilName: "சக்கரம் பிக்", regularPrice: 400, discountedPrice: 40, unit: "1 Box", image: "assets/products/pro12.jpg" },
  { sno: 13, name: "G.C.BIG (25 PIC)", tamilName: "சக்கரம் பிக் (25 பீஸ்)", regularPrice: 1100, discountedPrice: 110, unit: "1 Box", image: "assets/products/pro13.jpg" },
  { sno: 14, name: "G.C.SPL", tamilName: "சக்கரம் ஸ்பெஷல்", regularPrice: 750, discountedPrice: 75, unit: "1 Box", image: "assets/products/pro14.jpg" },
  { sno: 15, name: "G.C.DLX", tamilName: "சக்கரம் டீலக்ஸ்", regularPrice: 1100, discountedPrice: 110, unit: "1 Box", image: "assets/products/pro15.jpg" },
  { sno: 16, name: "G.C.SPL (PLASTIC BASE)", tamilName: "சக்கரம் ஸ்பெஷல்", regularPrice: 1100, discountedPrice: 110, unit: "1 Box", image: "assets/products/pro16.jpg" },
  { sno: 17, name: "G.C.DLX (PLASTIC BASE)", tamilName: "சக்கரம் டீலக்ஸ்", regularPrice: 1350, discountedPrice: 135, unit: "1 Box", image: "assets/products/pro17.jpg" },
  { sno: 18, name: "WIRE CHAKKAR", tamilName: "வயர் சக்கரம்", regularPrice: 2100, discountedPrice: 210, unit: "1 Box", image: "assets/products/pro18.jpg" },
  
  { sno: 19, name: "F.P.BIG", tamilName: "பூச்சட்டி பெரியது", regularPrice: 700, discountedPrice: 70, unit: "1 Box", image: "assets/products/pro19.jpg" },
  { sno: 20, name: "F.P.SPL", tamilName: "பூச்சட்டி ஸ்பெசல்", regularPrice: 900, discountedPrice: 90, unit: "1 Box", image: "assets/products/pro20.jpg" },
  { sno: 21, name: "F.P.ASHOKA", tamilName: "பூச்சட்டி அசோகா", regularPrice: 1200, discountedPrice: 120, unit: "1 Box", image: "assets/products/pro21.jpg" },
  { sno: 22, name: "F.P.COLOURKOTI", tamilName: "பூச்சட்டி கலர் கோட்டி", regularPrice: 1900, discountedPrice: 190, unit: "1 Box", image: "assets/products/pro22.jpg" },
  { sno: 23, name: "F.P.DLX (5 PCS)", tamilName: "பூச்சட்டி டீலக்ஸ் (5 பீஸ்)", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/products/pro23.jpg" },
  { sno: 24, name: "F.P. DLX (10 PCS)", tamilName: "பூச்சட்டி டீலக்ஸ் (10 பீஸ்)", regularPrice: 3900, discountedPrice: 390, unit: "1 Box", image: "assets/products/pro24.jpg" },
  { sno: 25, name: "F.P.SUPER DLX BOMB", tamilName: "பூச்சட்டி சூப்பர் டீலக்ஸ்", regularPrice: 1800, discountedPrice: 180, unit: "1 Box", image: "assets/products/pro25.jpg" },
  
  { sno: 26, name: "BULLET BOMB", tamilName: "புல்லட் பாம்", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/products/pro26.jpg" },
  { sno: 27, name: "HYDRO BOMB", tamilName: "ஹைட்ரோ பாம்", regularPrice: 650, discountedPrice: 65, unit: "1 Box", image: "assets/products/pro27.jpg" },

  // Page 4: BOMB & BIJILI & TWINKLING STARS & CHILDRENS ATTRACTION
  { sno: 28, name: "CLASSIC BOMB", tamilName: "கிளாசிக் பாம்", regularPrice: 1350, discountedPrice: 135, unit: "1 Box", image: "assets/products/pro28.jpg" },
  { sno: 29, name: "AGNI BOMB 7", tamilName: "அக்னி பாம் 7", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/products/pro29.jpg" },
  { sno: 30, name: "MIGHTY BOMB", tamilName: "மைட்டி பாம்", regularPrice: 3000, discountedPrice: 300, unit: "1 Box", image: "assets/products/pro30.jpg" },
  { sno: 31, name: "FLOWER BOMB", tamilName: "ப்ளவர் பாம்", regularPrice: 1000, discountedPrice: 100, unit: "1 Box", image: "assets/products/pro31.jpg" },
  
  { sno: 32, name: "RED BIJILI 100 Pcs", tamilName: "சிவப்பு பிஜிலி 100 பீஸ்", regularPrice: 400, discountedPrice: 40, unit: "1 Pkt", image: "assets/products/pro32.jpg" },
  { sno: 33, name: "STRIPPED BIJILI 100 Pcs", tamilName: "கோடு பிஜிலி 100 பீஸ்", regularPrice: 450, discountedPrice: 45, unit: "1 Pkt", image: "assets/products/pro33.jpg" },
  
  { sno: 34, name: "1 1/2 TWINKLING STAR", tamilName: "1 1/2 அடி சாட்டை", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/products/pro34.jpg" },
  { sno: 35, name: "4 TWINKLING STAR", tamilName: "4 அடி சாட்டை", regularPrice: 650, discountedPrice: 65, unit: "1 Box", image: "assets/products/pro35.jpg" },
  { sno: 36, name: "JIL JIL", tamilName: "ஜில் ஜில்", regularPrice: 430, discountedPrice: 43, unit: "1 Box", image: "assets/products/pro36.jpg" },
  { sno: 37, name: "Colour String Red & Green", tamilName: "கலர் ஸ்டிரிங் ரெட் & கிரீன்", regularPrice: 950, discountedPrice: 95, unit: "1 Box", image: "assets/products/pro37.jpg" },
  
  { sno: 38, name: "STONE", tamilName: "ஸ்டோன்", regularPrice: 220, discountedPrice: 22, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 39, name: "KIT KAT", tamilName: "கிட் காட்", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/products/pro39.jpg" },
  { sno: 40, name: "MAGIC POP", tamilName: "மேஜிக் பாப்", regularPrice: 200, discountedPrice: 20, unit: "1 Box", image: "assets/products/pro40.jpg" },
  { sno: 41, name: "SERPENT EGG", tamilName: "சர்பண்ட் எக்", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/products/pro41.jpg" },
  { sno: 42, name: "ANACONDA", tamilName: "அனகோண்டா", regularPrice: 850, discountedPrice: 85, unit: "1 Box", image: "assets/products/pro42.jpg" },

  // Page 5: IN THE AIR & FANCY FOUNTAIN (S.No. 59 is omitted)
  { sno: 43, name: "ROCKET BOMB", tamilName: "ராக்கெட் பாம்", regularPrice: 1000, discountedPrice: 100, unit: "1 Box", image: "assets/products/pro43.jpg" },
  { sno: 44, name: "2 SOUND ROCKET", tamilName: "2 சவுண்ட் ராக்கெட்", regularPrice: 1300, discountedPrice: 130, unit: "1 Box", image: "assets/products/pro144.webp" },
  { sno: 45, name: "WHISTLING ROCKET", tamilName: "விசிலிங் ராக்கெட்", regularPrice: 2100, discountedPrice: 210, unit: "1 Box", image: "assets/products/pro45.jpg" },
  { sno: 46, name: "MULTI COLOUR ROCKET FANCY FOUNTAIN", tamilName: "மல்டிகலர் ராக்கெட்", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro46.jpg" },
  
  { sno: 47, name: "PEACOCK FEATHER", tamilName: "மயில் தோகை", regularPrice: 1100, discountedPrice: 110, unit: "1 Box", image: "assets/products/pro47.jpg" },
  { sno: 48, name: "DISCO SHOWER", tamilName: "டிஸ்கோ ஷவர்", regularPrice: 1100, discountedPrice: 110, unit: "1 Box", image: "assets/products/pro48.jpg" },
  { sno: 49, name: "TRI COLOUR FOUNTAIN", tamilName: "5 கலர் பவுன்டைன்", regularPrice: 2800, discountedPrice: 280, unit: "1 Box", image: "assets/products/pro49.jpg" },
  { sno: 50, name: "TIP TOP", tamilName: "டிப் டாப்", regularPrice: 600, discountedPrice: 60, unit: "1 Box", image: "assets/products/pro50.jpg" },
  { sno: 51, name: "RAAVAN 3 COLOUR", tamilName: "ராவண் 3 கலர்", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/products/pro51.jpg" },
  { sno: 52, name: "LAUGHING MONKEY RED", tamilName: "", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 53, name: "STRAWBERRY PINK", tamilName: "ஸ்ட்ராபெரி பிங்க்", regularPrice: 1350, discountedPrice: 135, unit: "1 Box", image: "assets/products/pro53.jpg" },
  { sno: 54, name: "CHELSE MEGA FLOWER POT", tamilName: "செல்சி", regularPrice: 3900, discountedPrice: 390, unit: "1 Box", image: "assets/products/pro54.jpg" },
  { sno: 55, name: "CRACKLING FOUNTAIN", tamilName: "கிராக்ஸிங் பவுண்டைன்", regularPrice: 3300, discountedPrice: 330, unit: "1 Box", image: "assets/products/pro55.jpg" },
  { sno: 56, name: "COCKTAIL", tamilName: "காக் டெயில்", regularPrice: 3300, discountedPrice: 330, unit: "1 Box", image: "assets/products/pro56.jpg" },
  { sno: 57, name: "WOWSTAR KURKURE 5 Pcs", tamilName: "", regularPrice: 2800, discountedPrice: 280, unit: "1 Box", image: "assets/products/pro57.jpg" },
  { sno: 58, name: "SIREN DLX", tamilName: "சைரன் டீலக்ஸ்", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/products/pro58.jpg" },
  { sno: 60, name: "SHIN CHAN", tamilName: "சின் சான்", regularPrice: 1000, discountedPrice: 100, unit: "1 Box", image: "assets/products/pro60.jpg" },

  // Page 6: FANCY FOUNTAIN (Cont.) & FANCY CHAKKAR & FANCY PENCIL
  { sno: 61, name: "FIRE EGG", tamilName: "பயர் எஃக்", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/products/pro61.jpg" },
  { sno: 62, name: "8 TRIPLE MONKEY 3 IN-1", tamilName: "8 டிரிப்பில் மங்கி", regularPrice: 2500, discountedPrice: 250, unit: "1 Box", image: "assets/products/pro62.webp" },
  { sno: 63, name: "6 DOUBLE DECHEN 2 IN-1", tamilName: "6 டபுள் டெக்கன்", regularPrice: 2000, discountedPrice: 200, unit: "1 BoxX", image: "assets/products/pro63.jpg" },
  { sno: 64, name: "POWER RANGER", tamilName: "பவர் ரேஞ்சர்", regularPrice: 1300, discountedPrice: 130, unit: "1 Box", image: "assets/products/pro64.jpg" },
  { sno: 65, name: "MANNY", tamilName: "மெனி", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 66, name: "SIMBA", tamilName: "சிம்பா", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/products/pro66.jpg" },
  { sno: 67, name: "BUJI", tamilName: "புஜ்ஜி", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/products/pro67.jpg" },
  { sno: 68, name: "DRAGONS", tamilName: "டிராகன்ஸ்", regularPrice: 2300, discountedPrice: 230, unit: "1 Box", image: "assets/products/pro68.jpg" },
  { sno: 69, name: "KIT KAT MIX (5 Pcs)", tamilName: "கிட் கேட் 5 பீசஸ்", regularPrice: 1700, discountedPrice: 170, unit: "1 Box", image: "assets/products/pro69.jpg" },
  { sno: 70, name: "5 STAR (1 IN 5) 5 COLOR", tamilName: "5 ஸ்டார் (1 இன் 5) 5 கலர்", regularPrice: 3000, discountedPrice: 300, unit: "1 Box", image: "assets/products/pro70.jpg" },
  
  { sno: 71, name: "4 X 4 WHEEL", tamilName: "4 * 4 வீல்", regularPrice: 2500, discountedPrice: 250, unit: "1 Box", image: "assets/products/pro71.jpg" },
  { sno: 72, name: "AVENGER WHEEL", tamilName: "அவென்சர் வீல்", regularPrice: 2500, discountedPrice: 250, unit: "1 Box", image: "assets/products/pro72.jpg" },
  { sno: 73, name: "WHISTLING DIXIE", tamilName: "விசிலிங் திக்ஷி", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/products/pro73.jpg" },
  { sno: 74, name: "PLANET WHEELING (pop com) FANCY PENCIL", tamilName: "", regularPrice: 1800, discountedPrice: 180, unit: "1 Box", image: "assets/products/pro74.jpg" },
  
  { sno: 75, name: "MIAMI RED 2 PCS", tamilName: "மியாமி ரெட்", regularPrice: 1300, discountedPrice: 130, unit: "1 Box", image: "assets/products/pro75.jpg" },
  { sno: 76, name: "RAINBOW SMOKE 3 PCS", tamilName: "ரெயின்போ ஸ்மோக் 3 பீசஸ்", regularPrice: 3000, discountedPrice: 300, unit: "1 Box", image: "assets/products/pro76.jpg" },
  { sno: 77, name: "LOLLY POP CRACKLING", tamilName: "லாலி பாப் கிராக்ளிங்", regularPrice: 1900, discountedPrice: 190, unit: "1 Box", image: "assets/products/pro77.jpg" },

  // Page 7: FANCY PENCIL (Cont.) & PEACOCK FOUNTAIN & MINI FANCY & MEGA FANCY
  { sno: 78, name: "FUJI CANDLE", tamilName: "ப்யூஜி கேண்டில்", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/images/star-logo.png" },
  
  { sno: 79, name: "PEACOCK 5 WINGS", tamilName: "பீகாக் 5 விங்ஸ்", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/products/pro79.jpg" },
  { sno: 80, name: "PEACOCK 3 WINGS", tamilName: "பீகாக் 3 விங்க்ஸ்", regularPrice: 2100, discountedPrice: 210, unit: "1 Box", image: "assets/products/pro80.jpg" },
  { sno: 81, name: "BADA PEACOCK (2 in 1)", tamilName: "படா பீகாக்", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro81.jpg" },
  
  { sno: 82, name: "CHOTTA FANCY", tamilName: "சோட்டா பேன்சி", regularPrice: 400, discountedPrice: 40, unit: "1 Box", image: "assets/products/pro82.jpg" },
  { sno: 83, name: "7 SHOTS", tamilName: "7 ஷாட்ஸ்", regularPrice: 1200, discountedPrice: 120, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 84, name: "PENTA", tamilName: "பென்டா", regularPrice: 1850, discountedPrice: 185, unit: "1 Box", image: "assets/products/pro84.jpg" },
  { sno: 85, name: "STAR WAR", tamilName: "ஸ்டார் வார்", regularPrice: 3500, discountedPrice: 350, unit: "1 Box", image: "assets/images/star-logo.png" },
  
  { sno: 86, name: "2 1/2\" 3 IDIOTS (3 STEP)", tamilName: "2\" ஏரியல் அவுட் சிங்கிள்", regularPrice: 2500, discountedPrice: 250, unit: "1 Box", image: "assets/products/pro86.jpg" },
  { sno: 87, name: "2\" FANCY (3 PCS)", tamilName: "2 பேன்ஸி (3 PCS)", regularPrice: 4000, discountedPrice: 400, unit: "1 Box", image: "assets/products/pro87.webp" },
  { sno: 88, name: "3 1/2\" AERIAL OUT 2PCS", tamilName: "3 1/2\" 2", regularPrice: 6000, discountedPrice: 600, unit: "1 Box", image: "assets/products/pro88.jpg" },
  { sno: 89, name: "3 1/2\" AERIAL TIN (1 PCE)", tamilName: "3 1/2\" ஏரியல் அவுட் டின் 1 பீஸ்", regularPrice: 3300, discountedPrice: 330, unit: "1 Box", image: "assets/products/pro89.webp" },
  { sno: 90, name: "4\" DOUBLE BALL", tamilName: "4\" ஏரியல் டபுள் பால்", regularPrice: 5000, discountedPrice: 500, unit: "1 Box", image: "assets/products/pro90.jpg" },
  { sno: 91, name: "4 AERIAL FANCY 2 PCS", tamilName: "4 1/2\" ஏரியல் அவுட் 2பீஸ்", regularPrice: 8000, discountedPrice: 800, unit: "1 Box", image: "assets/products/pro91.jpg" },
  { sno: 92, name: "5\" AERIAL OUT 2 PCS MEGA FANCY COLOUR", tamilName: "5\" ஏரியல் அவுட் 3பீஸ்", regularPrice: 10000, discountedPrice: 1000, unit: "1 Box", image: "assets/products/pro92.jpg" },
  { sno: 93, name: "WOW PINK", tamilName: "வாவ் பின்க்", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro93.jpg" },

  // Page 8: MEGA FANCY COLOUR & CRACKLING SHOT RIDER & MULTI COLOUR SHOTS
  { sno: 94, name: "WOW PURPLE", tamilName: "வாவ் பர்புள்", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro94.jpg" },
  { sno: 95, name: "WOW BLUE", tamilName: "வாவ் ப்ளூ", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro95.jpg" },
  { sno: 96, name: "WOW ORANGE", tamilName: "வாவ் ஆரஞ்ச்", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro96.jpg" },
  { sno: 97, name: "GOLDEN EYES", tamilName: "கோல்டன் ஐஸ்", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro97.jpg" },
  { sno: 98, name: "TEXAS DELIGHT (CRACKLING SHOT)", tamilName: "", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 99, name: "7 WONDERS (7 STEPS)", tamilName: "7 ஒண்டர்ஸ்", regularPrice: 4000, discountedPrice: 400, unit: "1 Box", image: "assets/products/pro99.jpg" },
  { sno: 100, name: "GUN SHOOTER (9 SHOT)", tamilName: "கன் சூட்டர்", regularPrice: 4000, discountedPrice: 400, unit: "1 Box", image: "assets/images/star-logo.png" },
  
  { sno: 101, name: "12 SHOTS RIDER", tamilName: "12 சாட் ரைடர்", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/products/pro101.png" },
  { sno: 102, name: "25 SHOTS RIDER", tamilName: "25 சாட்ரைடர்", regularPrice: 2800, discountedPrice: 280, unit: "1 Box", image: "assets/products/pro102.jpg" },
  { sno: 103, name: "50 SHOTS RIDER", tamilName: "50 சாட்ரைடர்", regularPrice: 5500, discountedPrice: 550, unit: "1 Box", image: "assets/products/pro103.webp" },
  
  { sno: 104, name: "LOVE DOSE", tamilName: "லவ் டோஸ்", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 105, name: "12 SHOT RED & GREEN", tamilName: "12 சாட் ரெட்", regularPrice: 1800, discountedPrice: 180, unit: "1 Box", image: "assets/products/pro105.png" },
  { sno: 106, name: "RANG CHAKKAR (10 SHOT)", tamilName: "ரங்சக்கரம்", regularPrice: 2200, discountedPrice: 220, unit: "1 Box", image: "assets/products/pro106.webp" },
  { sno: 107, name: "CANDY CRUSH", tamilName: "கேன்டி கிரஸ்", regularPrice: 4500, discountedPrice: 450, unit: "1 Box", image: "assets/products/pro107.jpg" },
  { sno: 108, name: "15 SHOT MULTI COLOR", tamilName: "15 சாட் மல்டிகலர்", regularPrice: 2800, discountedPrice: 280, unit: "1 Box", image: "assets/products/pro108.png" },
  { sno: 109, name: "WHISTLING ZIP (25 SHOT)", tamilName: "", regularPrice: 7000, discountedPrice: 700, unit: "1 Box", image: "assets/products/pro109.webp" },
  { sno: 110, name: "30 SHOT (M.C) SRI DURGA", tamilName: "30 ஒரு கா", regularPrice: 4000, discountedPrice: 400, unit: "1 Box", image: "assets/products/pro110.webp" },
  { sno: 111, name: "30 SHOT (M.C) JOKER", tamilName: "30 சாட் மல்டிகலர் ஜோக்கர்", regularPrice: 5000, discountedPrice: 500, unit: "1 Box", image: "assets/images/star-logo.png" },

  // Page 9: MULTI COLOUR SHOTS (Cont.) & MULTI COLOUR MEGA SET OUT & KIDS SPECIAL
  { sno: 112, name: "30 SHOT (M.C) WOW STAR", tamilName: "30", regularPrice: 5500, discountedPrice: 550, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 113, name: "30 SHOT (M.C) VADIVEL", tamilName: "30 சாட் மல்டிகலர் வடிவேல்", regularPrice: 6500, discountedPrice: 650, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 114, name: "60 SHOT (M.C) SRI DURGA", tamilName: "60 ஒரு கா", regularPrice: 8000, discountedPrice: 800, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 115, name: "60 SHOT (M.C) JOKER", tamilName: "60சாட் மல்டிகலர் ஜோக்கர்", regularPrice: 10000, discountedPrice: 1000, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 116, name: "60 SHOT (M.C)WOW STAR", tamilName: "60m", regularPrice: 11000, discountedPrice: 1100, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 117, name: "120 SHOT (M.C) SRI DURGA", tamilName: "120", regularPrice: 16000, discountedPrice: 1600, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 118, name: "120 SHOT (M.C)JOKER", tamilName: "120சாட் மல்டிகலர் ஜோக்கர்", regularPrice: 20000, discountedPrice: 2000, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 119, name: "120 SHOT (M.C)WOW STAR", tamilName: "120", regularPrice: 22000, discountedPrice: 2200, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 120, name: "240 SHOT (M.C)JOKER", tamilName: "240 ஒரு", regularPrice: 35000, discountedPrice: 3500, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 121, name: "240 SHOT (M.C)WOW STAR", tamilName: "240 நம்பர்", regularPrice: 40000, discountedPrice: 4000, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 122, name: "504 SHOT (M.C)WOW STAR", tamilName: "504 ஒரு", regularPrice: 85000, discountedPrice: 8500, unit: "1 Box", image: "assets/images/star-logo.png" },
  
  { sno: 123, name: "10 X 10 CARNIVAL NIGHT", tamilName: "", regularPrice: 38000, discountedPrice: 3800, unit: "1 Box", image: "assets/products/pro123.jpg" },
  { sno: 124, name: "2\" SET OUT 30 SHOTS", tamilName: "2 சேட் அவுட் சாட்", regularPrice: 35000, discountedPrice: 3500, unit: "1 Box", image: "assets/products/pro124.jpg" },
  { sno: 125, name: "2 1/2\" GWEN TEN 25 SHOTS", tamilName: "2 1/2\"", regularPrice: 45000, discountedPrice: 4500, unit: "1 Box", image: "assets/products/pro125.webp" },
  { sno: 126, name: "3\" BEN TEN 20 SHOTS", tamilName: "3 பென்டன் 20 சாட்", regularPrice: 60000, discountedPrice: 6000, unit: "1 Box", image: "assets/products/pro126.webp" },
  
  { sno: 127, name: "BUTTERFLY", tamilName: "பட்டர் பிளை", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/products/pro127.jpg" },
  { sno: 128, name: "BAMBARAM", tamilName: "பம்பரம்", regularPrice: 1000, discountedPrice: 100, unit: "1 Box", image: "assets/products/pro128.jpg" },
  { sno: 129, name: "DRONE", tamilName: "ட்ரோன்", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/products/pro129.jpg" },

  // Page 10: KIDS SPECIAL (Cont.) & KUSHI BLACK MONEY & COLOUR MATCHES & SPARKLERS
  { sno: 130, name: "HELICOPTER", tamilName: "கெளிகப்பிட்டர்", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/products/pro130.jpg" },
  { sno: 131, name: "PHOTO FLASH", tamilName: "போட்டோ பிலாஸ்", regularPrice: 1000, discountedPrice: 100, unit: "1 Box", image: "assets/products/pro131.webp" },
  
  { sno: 132, name: "MONEY MONEY", tamilName: "மணி மணி", regularPrice: 4000, discountedPrice: 400, unit: "1 Box", image: "assets/products/pro132.jpg" },
  { sno: 133, name: "ROSE PEDAL", tamilName: "ரோஜா இதழ்", regularPrice: 4000, discountedPrice: 400, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 134, name: "ANOR BOMB 1 Pce", tamilName: "அனார் பாம் (1 பீஸ்)", regularPrice: 1500, discountedPrice: 150, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 135, name: "MONEY IN THE BANK", tamilName: "மணி இன் த பேங்க்", regularPrice: 1800, discountedPrice: 180, unit: "1 Box", image: "assets/images/star-logo.png" },
  
  { sno: 136, name: "ANNAM (10 IN 1)", tamilName: "அன்னம் (10 இன் 1)", regularPrice: 1200, discountedPrice: 120, unit: "1 Box", image: "assets/products/pro136.webp" },
  { sno: 137, name: "HERO (10 IN 1)", tamilName: "ஹீரோ (10 இன் 1)", regularPrice: 1600, discountedPrice: 160, unit: "1 Box", image: "assets/products/pro137.webp" },
  { sno: 138, name: "MEJESTIC (10 IN 1)", tamilName: "மெஜஸ்டி (10இன் 1)", regularPrice: 2800, discountedPrice: 280, unit: "1 Box", image: "assets/products/pro138.webp" },
  
  { sno: 139, name: "SPARKLERS 7 CM ELECTRIC", tamilName: "7 செமீ எலக்ட்ரிக்", regularPrice: 1300, discountedPrice: 130, unit: "10 Box", image: "assets/products/pro139.jpg" },
  { sno: 140, name: "7 CM COLOUR", tamilName: "7 செமீ கலர்", regularPrice: 1500, discountedPrice: 150, unit: "10 Box", image: "assets/products/pro140.jpg" },
  { sno: 141, name: "7 CM GREEN", tamilName: "7 செமீ கிரீன்", regularPrice: 1700, discountedPrice: 170, unit: "10 Box", image: "assets/products/pro141.webp" },
  { sno: 142, name: "7 CM RED", tamilName: "7 செமீ ரெட்", regularPrice: 1900, discountedPrice: 190, unit: "10 Box", image: "assets/products/pro142.webp" },
  { sno: 143, name: "10 CM ELECTRIC", tamilName: "10 செமீ எலக்ட்ரிக்", regularPrice: 250, discountedPrice: 25, unit: "1 Box", image: "assets/products/pro143.webp" },
  { sno: 144, name: "10 CM COLOUR", tamilName: "10 செமீ கலர்", regularPrice: 280, discountedPrice: 28, unit: "1 Box", image: "assets/products/pro144.webp" },
  { sno: 145, name: "10 CM GREEN", tamilName: "10 செமீ கிரீன்", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/products/pro145.webp" },
  { sno: 146, name: "10 CM RED", tamilName: "10 செமீ ரெட்", regularPrice: 330, discountedPrice: 33, unit: "1 Box", image: "assets/products/pro146.webp" },

  // Page 11: SPARKLERS (Continued)
  { sno: 147, name: "10 CM VIOLET", tamilName: "10 செமீ வயலட்", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 148, name: "10 CM BLUE", tamilName: "10 செமீ புளு", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 149, name: "10 CM PINK", tamilName: "10 செமீ பிங்க்", regularPrice: 300, discountedPrice: 30, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 150, name: "12 CM ELECTRIC", tamilName: "12 செமீ எலக்ட்ரிக்", regularPrice: 290, discountedPrice: 29, unit: "1 Box", image: "assets/products/pro150.webp" },
  { sno: 151, name: "12 CM COLOUR", tamilName: "12 செமீ கலர்", regularPrice: 310, discountedPrice: 31, unit: "1 Box", image: "assets/products/pro151.webp" },
  { sno: 152, name: "12 CM GREEN", tamilName: "12 செமீ கிரீன்", regularPrice: 330, discountedPrice: 33, unit: "1 Box", image: "assets/products/pro152.webp" },
  { sno: 153, name: "12 CM RED", tamilName: "12 செமீ ரெட்", regularPrice: 350, discountedPrice: 35, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 154, name: "15 CM ELECTRIC", tamilName: "15 செமீ எலக்ட்ரிக்", regularPrice: 500, discountedPrice: 50, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 155, name: "15 CM COLOUR", tamilName: "15 செமீ கலர்", regularPrice: 540, discountedPrice: 54, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 156, name: "15 CM GREEN", tamilName: "15 செமீ கிரீன்", regularPrice: 580, discountedPrice: 58, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 157, name: "15 CM RED", tamilName: "15 செமீ ரெட்", regularPrice: 620, discountedPrice: 62, unit: "1 Box", image: "assets/products/pro157.jpg" },
  { sno: 158, name: "15 CM PINK", tamilName: "15 செமீ பிங்க்", regularPrice: 680, discountedPrice: 68, unit: "1 Box", image: "assets/products/pro158.jpg" },
  { sno: 159, name: "30 CM ELECTRIC", tamilName: "30 செமீ எலக்ட்ரிக்", regularPrice: 500, discountedPrice: 50, unit: "1 Box", image: "assets/products/pro159.jpg" },
  { sno: 160, name: "30 CM COLOUR", tamilName: "30 செமீ கலர்", regularPrice: 540, discountedPrice: 54, unit: "1 Box", image: "assets/products/pro160.jpg" },
  { sno: 161, name: "30 CM GREEN", tamilName: "30 செமீ கிரீன்", regularPrice: 580, discountedPrice: 58, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 162, name: "30 CM RED", tamilName: "30 செமீ ரெட்", regularPrice: 620, discountedPrice: 62, unit: "1 Box", image: "assets/products/pro162.jpg" },
  { sno: 163, name: "50 CM ELECTRIC", tamilName: "50 செமீ எலக்ட்ரிக்", regularPrice: 1800, discountedPrice: 180, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 164, name: "50 CM COLOUR", tamilName: "50 செமீ கலர்", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/images/star-logo.png" },
  { sno: 165, name: "UMBERLLA SPARKLER", tamilName: "7 அம்பர்லா ஸ்பார்க்லர்", regularPrice: 2500, discountedPrice: 250, unit: "1 Box", image: "assets/products/pro165.jpg" },

  // Page 12: WALA & PAPER BOMB & GIFT BOX
  { sno: 166, name: "28 GIANT", tamilName: "28 ஜெயின்ட்", regularPrice: 250, discountedPrice: 25, unit: "1 Box", image: "assets/products/pro166.webp" },
  { sno: 167, name: "100 WALA", tamilName: "100 வாலா", regularPrice: 900, discountedPrice: 90, unit: "1 Box", image: "assets/products/pro167.jpg" },
  { sno: 168, name: "300 WALA", tamilName: "300 வாலா", regularPrice: 2000, discountedPrice: 200, unit: "1 Box", image: "assets/products/pro168.jpeg" },
  { sno: 169, name: "1000 WALA HALF", tamilName: "1000 வாலா காப்", regularPrice: 2500, discountedPrice: 250, unit: "1 Box", image: "assets/products/pro169.webp" },
  { sno: 170, name: "1000 WALA FULL", tamilName: "1000 வாலா", regularPrice: 3800, discountedPrice: 380, unit: "1 Box", image: "assets/products/pro170.jpg" },
  { sno: 171, name: "2000 WALA FULL", tamilName: "2000 D", regularPrice: 7600, discountedPrice: 760, unit: "1 Box", image: "assets/products/pro171.jpg" },
  { sno: 172, name: "5000 WALA FULL", tamilName: "5000 வாலா", regularPrice: 19000, discountedPrice: 1900, unit: "1 Box", image: "assets/products/pro172.jpg" },
  { sno: 173, name: "10000 WALA FULL", tamilName: "10000 வாலா", regularPrice: 38000, discountedPrice: 3800, unit: "1 Box", image: "assets/products/pro173.webp" },
  
  { sno: 174, name: "ATIYAL 1/4 KG", tamilName: "அட்டியள் 1/4 KG", regularPrice: 550, discountedPrice: 55, unit: "1 Box", image: "assets/products/pro174.webp" },
  { sno: 175, name: "ATIYAL 1/4 KG COLOUR PAPER", tamilName: "1/4 KG", regularPrice: 650, discountedPrice: 65, unit: "1 Box", image: "assets/products/pro175.jpg" },
  { sno: 176, name: "ATIYAL 1/2 KG", tamilName: "அட்டியள் 1/2 KG", regularPrice: 1100, discountedPrice: 110, unit: "1 Box", image: "assets/products/pro176.jpeg" },
  { sno: 177, name: "ATIYAL 1 KG", tamilName: "அட்டியள் 1 KG", regularPrice: 2200, discountedPrice: 220, unit: "1 Box", image: "assets/products/pro177.jpeg" }
];

// Global variables for wholesale cart
let cart = [];
let grandTotal = 0;

// Function to map product S.No to wholesale pack rules
function getPackDetails(sno, originalUnit) {
  const isBox = /box/i.test(originalUnit);
  const baseUnit = isBox ? "Box" : "Pkt";
  const baseUnitPlural = isBox ? "Boxes" : "Pkts";

  if (sno >= 1 && sno <= 6) return { size: 10, unit: "Pkts" };
  if (sno >= 7 && sno <= 11) return { size: 5, unit: "Pkts" };
  if (sno === 12) return { size: 2, unit: "Pkts" };
  if (sno >= 13 && sno <= 25) return { size: 1, unit: "Box" };
  if (sno === 26) return { size: 2, unit: "Boxes" };
  if (sno >= 27 && sno <= 31) return { size: 1, unit: "Box" };
  if (sno >= 32 && sno <= 36) return { size: 2, unit: baseUnitPlural };
  if (sno === 37) return { size: 1, unit: "Box" };
  if (sno >= 38 && sno <= 41) return { size: 2, unit: "Boxes" };
  if (sno >= 42 && sno <= 81) return { size: 1, unit: "Box" };
  if (sno === 82) return { size: 2, unit: "Boxes" };
  if (sno >= 83 && sno <= 138) return { size: 1, unit: "Box" };
  if (sno >= 139 && sno <= 142) return { size: 10, unit: "Boxes" };
  if (sno >= 143 && sno <= 149) return { size: 5, unit: "Boxes" };
  if (sno >= 150 && sno <= 158) return { size: 5, unit: "Boxes" };
  if (sno >= 159 && sno <= 162) return { size: 2, unit: "Boxes" };
  if (sno >= 163 && sno <= 165) return { size: 1, unit: "Box" };
  if (sno === 166) return { size: 2, unit: "Boxes" };
  if (sno >= 167 && sno <= 177) return { size: 1, unit: "Box" };
  
  return { size: 1, unit: baseUnit };
}

// Initialize the wholesale page logic when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  renderWholesaleProducts(wholesaleProducts);
  initializeSearch();
});

// Render the product cards dynamically
function renderWholesaleProducts(products) {
  const container = document.getElementById("products-container");
  if (!container) return;
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `<div class="col-12 text-center text-muted my-5">No products found matching your search.</div>`;
    return;
  }

  // Create cards dynamically
  products.forEach(product => {
    // Determine Wholesale Quantity & Price programmatically based on the rule mapping S.No
    const packDetails = getPackDetails(product.sno, product.unit);
    const wholesaleQty = packDetails.size;
    const packUnit = packDetails.unit;
    const wholesalePrice = product.discountedPrice * wholesaleQty;

    const cardHtml = `
      <div class="col-lg-6 col-md-6 mb-3 product-card-wrapper" data-name="${product.name.toLowerCase()}">
        <div class="product-card" data-sno="${product.sno}" data-name="${product.name}" data-price="${wholesalePrice}" data-unit="${wholesaleQty} ${packUnit}">
          <div class="row g-0">
            <div class="col-4">
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onclick="openImageModal(this)" loading="lazy" onerror="this.src='assets/images/star-logo.png'">
              </div>
            </div>
            <div class="col-8">
              <div class="product-details d-flex flex-column justify-content-between">
                <div>
                  <h6 class="product-name">
                    <span class="serial-number me-1">#${product.sno}.</span> ${product.name}
                    ${product.tamilName ? `<br><small class="text-secondary fw-normal fs-6">${product.tamilName}</small>` : ""}
                  </h6>
                  <div class="product-unit" style="font-size: 13px; color: #6c757d; margin-bottom: 4px;">Original Unit: <strong>${product.unit}</strong></div>
                  <div class="product-prices" style="font-size: 13px; margin-bottom: 8px;">
                    <span class="original-price-label text-decoration-line-through text-muted">Original: ₹${product.regularPrice}</span>
                    <span class="discount-price-label text-danger fw-bold ms-2">Discount: ₹${product.discountedPrice}</span>
                  </div>
                </div>
                <div class="wholesale-section" style="background-color: #fff9e6; border-radius: 8px; padding: 6px 10px; border: 1px solid #ffeeba;">
                  <div class="wholesale-qty" style="font-size: 12px; font-weight: bold; color: #856404; margin-bottom: 2px;">
                    Wholesale Pack: <strong>${wholesaleQty} ${packUnit}</strong> 
                    <span style="white-space: nowrap; font-weight: 800; color: #bd2130; margin-left: 4px;">(${product.discountedPrice} * ${wholesaleQty} = ${wholesalePrice})</span>
                  </div>
                  <div class="wholesale-price" style="font-size: 15px; font-weight: 800; color: #28a745; margin-bottom: 6px;">Pack Price: <strong>₹${wholesalePrice}</strong></div>
                  <div class="quantity-section d-flex align-items-center justify-content-between pt-2 border-top border-secondary-subtle">
                    <div class="quantity-controls d-flex align-items-center">
                      <button class="qty-btn minus btn btn-sm btn-outline-secondary py-0 px-2 fw-bold text-dark" style="background: white;" onclick="decreaseQuantity(this)">-</button>
                      <span class="quantity-display mx-2 fw-bold text-dark" style="font-size: 15px;">0</span>
                      <button class="qty-btn plus btn btn-sm btn-outline-secondary py-0 px-2 fw-bold text-dark" style="background: white;" onclick="increaseQuantity(this)">+</button>
                    </div>
                    <div class="total-price fw-bold text-secondary" style="font-size: 15px;">₹0.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHtml;
  });
}

// Search functionality (show/hide DOM wrappers to preserve quantity inputs)
function initializeSearch() {
  const searchInput = document.getElementById("global-search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      const wrappers = document.querySelectorAll(".product-card-wrapper");
      
      wrappers.forEach(wrapper => {
        const name = wrapper.getAttribute("data-name");
        const matches = name.includes(searchTerm);
        wrapper.style.display = matches ? "" : "none";
      });
    });
  }
}

// Quantity control functions
function increaseQuantity(button) {
  const card = button.closest('.product-card');
  const quantityDisplay = card.querySelector('.quantity-display');
  const currentQuantity = parseInt(quantityDisplay.textContent);
  const newQuantity = currentQuantity + 1;
  
  quantityDisplay.textContent = newQuantity;
  updateCardTotal(card);
  updateCartSummary();
}

function decreaseQuantity(button) {
  const card = button.closest('.product-card');
  const quantityDisplay = card.querySelector('.quantity-display');
  const currentQuantity = parseInt(quantityDisplay.textContent);
  
  if (currentQuantity > 0) {
    const newQuantity = currentQuantity - 1;
    quantityDisplay.textContent = newQuantity;
    updateCardTotal(card);
    updateCartSummary();
  }
}

function updateCardTotal(card) {
  const price = parseFloat(card.getAttribute('data-price'));
  const quantityDisplay = card.querySelector('.quantity-display');
  const totalElement = card.querySelector('.total-price');
  
  const quantity = parseInt(quantityDisplay.textContent);
  const total = price * quantity;
  
  totalElement.textContent = `₹${total.toFixed(2)}`;
  
  if (quantity > 0) {
    totalElement.style.color = '#28a745';
    totalElement.style.fontWeight = 'bold';
  } else {
    totalElement.style.color = '#6c757d';
    totalElement.style.fontWeight = 'bold';
  }
}

function updateCartSummary() {
  const allCards = document.querySelectorAll('.product-card');
  let totalItems = 0;
  let totalAmount = 0;
  const cartItems = [];
  
  allCards.forEach(card => {
    const quantityDisplay = card.querySelector('.quantity-display');
    if (!quantityDisplay) return;
    const quantity = parseInt(quantityDisplay.textContent);
    
    if (quantity > 0) {
      const sno = card.getAttribute('data-sno');
      const productName = card.getAttribute('data-name');
      const price = parseFloat(card.getAttribute('data-price'));
      const unit = card.getAttribute('data-unit');
      const total = price * quantity;
      
      totalItems += quantity;
      totalAmount += total;
      
      cartItems.push({
        sno: sno,
        name: productName,
        price: price,
        quantity: quantity,
        total: total,
        unit: unit
      });
    }
  });
  
  cart = cartItems;
  grandTotal = totalAmount;
  
  const cartSummary = document.getElementById('cartSummary');
  const itemsCount = document.querySelector('.cart-items-count');
  const totalAmountElement = document.querySelector('.cart-total-amount');
  
  if (totalItems > 0) {
    const deliveryCharge = Math.round(totalAmount * 0.03);
    const isGstApplicable = totalAmount > 5000;
    const gstCharge = isGstApplicable ? Math.round(totalAmount * 0.12) : 0;
    const grandTotalWithAll = totalAmount + deliveryCharge + gstCharge;

    cartSummary.style.display = 'block';
    itemsCount.textContent = `${totalItems} pack${totalItems > 1 ? 's' : ''}`;
    totalAmountElement.textContent = `₹${grandTotalWithAll.toFixed(2)}`;

    let noteEl = document.getElementById('wholesaleCartGstNote');
    if (!noteEl) {
      noteEl = document.createElement('div');
      noteEl.id = 'wholesaleCartGstNote';
      noteEl.style.fontSize = '11px';
      noteEl.style.opacity = '0.9';
      noteEl.style.marginTop = '2px';
      totalAmountElement.parentElement.appendChild(noteEl);
    }
    if (isGstApplicable) {
      noteEl.innerHTML = `(Subtotal: ₹${totalAmount.toLocaleString('en-IN')} + 3% Packing: ₹${deliveryCharge.toLocaleString('en-IN')} + 12% GST: ₹${gstCharge.toLocaleString('en-IN')})`;
    } else {
      noteEl.innerHTML = `(Subtotal: ₹${totalAmount.toLocaleString('en-IN')} + 3% Packing: ₹${deliveryCharge.toLocaleString('en-IN')})`;
    }
    document.body.style.paddingBottom = '110px';
  } else {
    cartSummary.style.display = 'none';
    document.body.style.paddingBottom = '0';
  }
}

// WhatsApp Wholesale order submission
function orderViaWhatsApp() {
  if (cart.length === 0) {
    Swal.fire('Please add some items to your cart first!', '', 'warning');
    return;
  }

  if (grandTotal < 3000) {
    Swal.fire('Minimum wholesale order amount is ₹3000. Please add more items to your cart.', '', 'warning');
    return;
  }

  const deliveryCharge = Math.round(grandTotal * 0.03);
  const isGstApplicable = grandTotal > 5000;
  const gstCharge = isGstApplicable ? Math.round(grandTotal * 0.12) : 0;
  const grandTotalWithDelivery = grandTotal + deliveryCharge + gstCharge;

  Swal.fire({
    title: 'Enter Wholesale Order Details',
    html: `
      <div style="text-align:left; font-size:13px; margin-bottom:12px; color:#495057; background:#fff3cd; padding:10px 12px; border-radius:6px; line-height: 1.45;">
        💰 <strong>Grand Total: ₹${grandTotalWithDelivery.toFixed(2)}</strong><br>
        <span style="font-size:11.5px; color:#78350f;">(Wholesale Amount: ₹${grandTotal.toFixed(2)} + 3% Packing: ₹${deliveryCharge.toFixed(2)}${isGstApplicable ? ` + 12% GST: ₹${gstCharge.toFixed(2)}` : ''})</span>
      </div>
      <div style="font-size: 13px; color: #6c757d; margin-bottom: 10px;">Delivery details are optional. You can enter them or proceed directly to WhatsApp.</div>
      <input type="text" id="custName" class="swal2-input" placeholder="Shop / Contact Name (Optional)">
      <input type="tel" id="custNumber" class="swal2-input" placeholder="Phone Number (Optional)">
      <textarea id="custAddress" class="swal2-textarea" placeholder="Delivery Address (Optional)"></textarea>
      <input type="text" id="custPincode" class="swal2-input" placeholder="Pincode (Optional)">
    `,
    confirmButtonText: 'Send Order via WhatsApp',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const name = document.getElementById('custName').value.trim();
      const address = document.getElementById('custAddress').value.trim();
      const pincode = document.getElementById('custPincode').value.trim();
      const number = document.getElementById('custNumber').value.trim();

      return { name, number, address, pincode };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, number, address, pincode } = result.value;

      let orderMessage = `🎆 *New Wholesale Order - Happy Enjoy Crackers* 🎆\n\n`;
      orderMessage += `📅 *Order Date:* ${new Date().toLocaleDateString()}\n\n`;
      if (name) orderMessage += `👤 *Wholesale Customer:* ${name}\n`;
      if (number) orderMessage += `📞 *Phone:* ${number}\n`;
      if (address) orderMessage += `🏠 *Address:* ${address}\n`;
      if (pincode) orderMessage += `📮 *Pincode:* ${pincode}\n`;
      if (name || number || address || pincode) {
        orderMessage += `\n`;
      }
      orderMessage += `📋 *Wholesale Order Details:*\n${'='.repeat(40)}\n`;

      cart.forEach((item, index) => {
        orderMessage += `${index + 1}. *${item.name}* (${item.unit})\n`;
        orderMessage += `    Wholesale Pack Price: ₹${item.price.toFixed(2)} × ${item.quantity} = ₹${item.total.toFixed(2)}\n\n`;
      });

      orderMessage += `${'='.repeat(40)}\n`;
      orderMessage += `Total Wholesale Amount = ₹${grandTotal.toFixed(2)}\n`;
      orderMessage += `Packing Charge (3%)    = ₹${deliveryCharge.toFixed(2)}\n`;
      if (isGstApplicable) {
        orderMessage += `GST Charge (12%)       = ₹${gstCharge.toFixed(2)}\n`;
      }
      orderMessage += `Grand Total            = ₹${grandTotalWithDelivery.toFixed(2)}\n\n`;
      if (isGstApplicable) {
        orderMessage += `_Note: 12% GST is strictly applicable on orders above ₹5,000._\n`;
      }
      orderMessage += `Thank you for your Wholesale Order! 🙏`;

      const phoneNumber = "9962314877";
      const encodedMessage = encodeURIComponent(orderMessage);
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");
      Swal.fire('Success!', 'Wholesale order sent via WhatsApp!', 'success');
    }
  });
}

// PDF Page popup viewer function
function showComboItems(comboName, pdfPage) {
  const pdfUrl = 'Happy_Enjoy_Crackers_Family_Combo_List.pdf';
  const iframeHtml = `
    <div style="width: 100%; height: 650px; overflow: hidden; border-radius: 8px;">
      <iframe src="${pdfUrl}#page=${pdfPage}&toolbar=0&navpanes=0" width="100%" height="100%" style="border: none;"></iframe>
    </div>
  `;
  
  Swal.fire({
    title: `<strong class="text-primary" style="font-size: 20px;">${comboName}</strong>`,
    html: iframeHtml,
    confirmButtonText: 'Close',
    confirmButtonColor: '#0d6efd',
    width: '750px'
  });
}

// Image modal pop-up function (matches standard website modal)
function openImageModal(imgElement) {
  const modalEl = document.getElementById("imageModal");
  if (!modalEl) return;
  const modal = new bootstrap.Modal(modalEl);
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("imageModalLabel");
  
  if (modalImage && modalTitle) {
    modalImage.src = imgElement.src;
    modalTitle.textContent = imgElement.alt;
    modal.show();
  }
}

// Export data and helper functions to window for global access if needed
window.HappyEnjoyCrackersWholesale = {
  products: wholesaleProducts,
  renderWholesaleProducts,
  openImageModal
};
