export interface Product {
  id: number;
  name: string;
  slug: string;
  category: 'blended-masala' | 'whole-spices' | 'grains' | 'pulses';
  categoryName: string;
  categorySlug: string;
  origin: string;
  grade: string;
  description: string;
  packagingSizes: { label: string; type: 'retail' | 'bulk' }[];
  varieties?: string[];
  color: string;
  moq: string;
  shelfLife: string;
  moisture: string;
  purity: string;
  hsCode: string;
  unsplashId: string;
  whatsappText: string;
  ingredients?: string;
  processingDetails?: string[];
  detailedSpecs?: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    "id": 1,
    "name": "Red Chilli Powder",
    "slug": "red-chilli-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Guntur, Andhra Pradesh",
    "grade": "Export Grade A",
    "description": "Vibrant and intensely spicy, our Guntur Red Chilli Powder is ground from sun-dried premium chillies to deliver exceptional color and heat.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#d9381e",
    "moq": "1 Metric Ton",
    "shelfLife": "12–18 Months",
    "moisture": "≤ 10%",
    "purity": "100% Pure",
    "hsCode": "09042211",
    "unsplashId": "/Photos/Red Chilli Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Red Chilli Powder.",
    "ingredients": "100% Dried Red Chillies (No additives)",
    "processingDetails": [
      "Hygienically cleaned & processed",
      "Machine ground for uniform texture",
      "No artificial color or preservatives added"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 10%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "40–60 Mesh (or as required)"
      },
      {
        "label": "ASTA Color Value",
        "value": "80–120 (depending on quality)"
      },
      {
        "label": "Pungency Level",
        "value": "As per customer requirement (mild / medium / hot)"
      },
      {
        "label": "Taste Level",
        "value": "Medium to Hot (customizable)"
      },
      {
        "label": "Aroma",
        "value": "Strong & Natural"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09042211</span>"
      }
    ]
  },
  {
    "id": 2,
    "name": "Turmeric Powder",
    "slug": "turmeric-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Salem, Tamil Nadu",
    "grade": "High Curcumin",
    "description": "A bright yellow, earthy spice with high curcumin content. Our turmeric powder is finely milled to ensure a robust flavor and maximum health benefits.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#f5a623",
    "moq": "1 Metric Ton",
    "shelfLife": "12–18 Months",
    "moisture": "≤ 10%",
    "purity": "100% Pure",
    "hsCode": "09103030",
    "unsplashId": "/Photos/Turmeric Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Turmeric Powder.",
    "ingredients": "100% Dried Turmeric Fingers (No additives)",
    "processingDetails": [
      "Carefully selected turmeric roots",
      "Hygienically cleaned & sun-dried",
      "Machine ground for uniform texture",
      "No artificial color or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Curcumin Content",
        "value": "2% – 5% (or higher if premium quality)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 10%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "40–60 Mesh (or as required)"
      },
      {
        "label": "Ash Content",
        "value": "≤ 9%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 1.5%"
      },
      {
        "label": "Taste",
        "value": "Warm, Slightly Bitter"
      },
      {
        "label": "Aroma",
        "value": "Earthy & Natural"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09103030</span>"
      }
    ]
  },
  {
    "id": 3,
    "name": "Kashmiri Red Chilli Powder",
    "slug": "kashmiri-red-chilli",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Kashmir, India",
    "grade": "Premium Color Grade",
    "description": "Known for its deep wine-red color and mild heat, authentic Kashmiri Chilli Powder elevates the visual appeal of any dish without overpowering the palate.",
    "packagingSizes": [
      {
        "label": "500g",
        "type": "retail"
      },
      {
        "label": "25kg Bag",
        "type": "bulk"
      }
    ],
    "color": "#b91d1d",
    "moq": "500 KG",
    "shelfLife": "18 Months",
    "moisture": "Max 10%",
    "purity": "99% Min",
    "hsCode": "09042211",
    "unsplashId": "/Photos/Kashmiri Red Chilli Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Kashmiri Red Chilli Powder."
  },
  {
    "id": 4,
    "name": "Cumin Powder",
    "slug": "cumin-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Gujarat, India",
    "grade": "Export Grade",
    "description": "Freshly roasted and ground cumin seeds delivering a warm, earthy aroma. An indispensable spice across Mexican, Indian, and Middle Eastern cuisines.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#8B5E1A",
    "moq": "1 Metric Ton",
    "shelfLife": "12–18 Months",
    "moisture": "≤ 10%",
    "purity": "100% Pure",
    "hsCode": "09093200",
    "unsplashId": "/Photos/Cumin Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Cumin Powder.",
    "ingredients": "100% Premium Cumin Seeds (Jeera)",
    "processingDetails": [
      "Sourced from high-quality farms",
      "Machine cleaned to remove impurities",
      "Hygienically ground for uniform texture",
      "No artificial colors or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 10%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "40–60 Mesh (or as required)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 9.5%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 1.5%"
      },
      {
        "label": "Volatile Oil Content",
        "value": "2% – 4% (key quality factor)"
      },
      {
        "label": "Taste",
        "value": "Warm, Earthy & Slightly Bitter"
      },
      {
        "label": "Aroma",
        "value": "Strong & Distinctive"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09093200</span>"
      }
    ]
  },
  {
    "id": 5,
    "name": "Garam Masala",
    "slug": "garam-masala",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Gujarat, India",
    "grade": "Restaurant Grade",
    "description": "A highly aromatic signature blend of premium roasted whole spices. Formulated to bring warmth, complexity, and finishing notes to rich curries and marinades.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#6b4423",
    "moq": "500 KG",
    "shelfLife": "12 Months",
    "moisture": "≤ 10%",
    "purity": "100% Pure",
    "hsCode": "09109100",
    "unsplashId": "/Photos/Garam Masala.webp",
    "whatsappText": "Hi Blazze, I am interested in bulk Garam Masala.",
    "ingredients": "Coriander, Cumin, Black Pepper, Cloves, Cardamom, Cinnamon, Bay Leaf (Customizable)",
    "processingDetails": [
      "Premium whole spices sourced from trusted farms",
      "Machine cleaned & carefully blended",
      "Hygienically ground for consistent texture",
      "No artificial colors or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 10%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "40–60 Mesh (or customizable)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 8–10%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 1.5%"
      },
      {
        "label": "Volatile Oil Content",
        "value": "As per blend (ensures strong aroma)"
      },
      {
        "label": "Taste",
        "value": "Rich, Warm & Spicy"
      },
      {
        "label": "Aroma",
        "value": "Strong, Aromatic & Balanced"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09109100</span>"
      }
    ]
  },
  {
    "id": 6,
    "name": "Coriander Powder",
    "slug": "coriander-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Rajasthan, India",
    "grade": "Export Quality",
    "description": "Milled from sun-dried green coriander seeds. It offers a fresh, citrusy, and mild flavor that forms the base of numerous traditional spice blends.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#c2a878",
    "moq": "1 Metric Ton",
    "shelfLife": "12 Months",
    "moisture": "≤ 10%",
    "purity": "100% Pure",
    "hsCode": "09092200",
    "unsplashId": "/Photos/Coriander Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Coriander Powder.",
    "ingredients": "100% Premium Coriander Seeds",
    "processingDetails": [
      "Sourced from high-quality farms",
      "Machine cleaned to remove dust & impurities",
      "Hygienically ground for uniform texture",
      "No artificial color or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 10%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "40–60 Mesh (or customizable)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 9%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 1.5%"
      },
      {
        "label": "Volatile Oil Content",
        "value": "0.3% – 1.0%"
      },
      {
        "label": "Taste",
        "value": "Mild, Slightly Sweet & Citrusy"
      },
      {
        "label": "Aroma",
        "value": "Fresh, Pleasant & Aromatic"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09092200</span>"
      }
    ]
  },
  {
    "id": 7,
    "name": "Cumin Coriander Powder",
    "slug": "cumin-coriander",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Gujarat, India",
    "grade": "Premium Blend",
    "description": "The classic 'Dhana Jeera' mix, perfectly balancing the earthy depth of cumin with the citrusy lightness of coriander. A staple in Indian coastal cooking.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#a47c43",
    "moq": "1 Metric Ton",
    "shelfLife": "12 Months",
    "moisture": "≤ 10%",
    "purity": "100% Pure",
    "hsCode": "09109100",
    "unsplashId": "/Photos/Cumin Coriander Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Cumin Coriander Powder.",
    "ingredients": "Coriander Seeds (60% – 70%), Cumin Seeds: (30% – 40%) (Customizable)",
    "processingDetails": [
      "Premium quality seeds sourced from trusted farms",
      "Machine cleaned & sorted",
      "Carefully blended for consistent taste",
      "Hygienically ground for uniform texture",
      "No artificial colors or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 10%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "40–60 Mesh (or customizable)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 9–10%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 1.5%"
      },
      {
        "label": "Volatile Oil Content",
        "value": "As per blend ratio"
      },
      {
        "label": "Taste",
        "value": "Mild, Warm & Balanced"
      },
      {
        "label": "Aroma",
        "value": "Fresh, Earthy & Aromatic"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09109100</span>"
      }
    ]
  },
  {
    "id": 8,
    "name": "Garlic Powder",
    "slug": "garlic-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Madhya Pradesh, India",
    "grade": "A Grade Dehydrated",
    "description": "Intensely pungent and savory, our pure dehydrated garlic powder dissolves instantly to deliver robust garlic flavor to sauces, rubs, and baked goods.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#f4f0cb",
    "moq": "500 KG",
    "shelfLife": "12–18 Months",
    "moisture": "≤ 6%",
    "purity": "100% Pure",
    "hsCode": "07129030",
    "unsplashId": "/Photos/Garlic Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Garlic Powder.",
    "ingredients": "100% Dehydrated Garlic",
    "processingDetails": [
      "Fresh garlic cloves carefully selected",
      "Peeled, washed & dehydrated",
      "Hygienically processed and finely ground",
      "No artificial colors, flavors, or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 6% (important for shelf life)"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "80–100 Mesh (fine powder)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 5%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 0.5%"
      },
      {
        "label": "Bulk Density",
        "value": "0.5 – 0.7 g/ml"
      },
      {
        "label": "Taste",
        "value": "Strong, Pungent & Savory"
      },
      {
        "label": "Aroma",
        "value": "Sharp & Characteristic Garlic Aroma"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>07129030</span>"
      }
    ]
  },
  {
    "id": 9,
    "name": "Ginger Powder",
    "slug": "ginger-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Kerala, India",
    "grade": "Export Grade",
    "description": "Finely ground dried ginger root that brings a sharp, warm, and spicy bite. Perfect for both savory Asian dishes and sweet baked confectioneries.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#e2c08d",
    "moq": "500 KG",
    "shelfLife": "12–18 Months",
    "moisture": "≤ 8%",
    "purity": "100% Pure",
    "hsCode": "09101210",
    "unsplashId": "/Photos/Ginger Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Ginger Powder.",
    "ingredients": "100% Dried Ginger",
    "processingDetails": [
      "High-quality fresh ginger roots selected",
      "Cleaned, sliced & properly dried",
      "Hygienically processed and finely ground",
      "No artificial colors or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 8%"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "60–80 Mesh (or as required)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 6%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 1.5%"
      },
      {
        "label": "Crude Fiber",
        "value": "≤ 5–6%"
      },
      {
        "label": "Taste",
        "value": "Warm, Spicy & Slightly Sweet"
      },
      {
        "label": "Aroma",
        "value": "Strong, Fresh & Characteristic"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09101210</span>"
      }
    ]
  },
  {
    "id": 10,
    "name": "Onion Powder",
    "slug": "onion-powder",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Maharashtra, India",
    "grade": "A Grade Dehydrated",
    "description": "A sweet and savory necessity for any pantry. Our dehydrated white onion powder mixes effortlessly into soups, dressings, and dry seasoning rubs.",
    "packagingSizes": [
      {
        "label": "100g / 200g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Pouch/Jar/Export Bags)",
        "type": "bulk"
      }
    ],
    "color": "#f5edd6",
    "moq": "1 Metric Ton",
    "shelfLife": "12–18 Months",
    "moisture": "≤ 6%",
    "purity": "100% Pure",
    "hsCode": "07122000",
    "unsplashId": "/Photos/Onion Powder.webp",
    "whatsappText": "Hi Blazze, I am interested in Onion Powder.",
    "ingredients": "100% Dehydrated Onion",
    "processingDetails": [
      "Fresh onions carefully selected",
      "Peeled, sliced & dehydrated",
      "Hygienically processed and finely ground",
      "No artificial colors, flavors, or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 6% (important for shelf life)"
      },
      {
        "label": "Mesh Size (Fineness)",
        "value": "80–100 Mesh (fine powder)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 5%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 0.5%"
      },
      {
        "label": "Bulk Density",
        "value": "0.4 – 0.7 g/ml"
      },
      {
        "label": "Taste",
        "value": "Mildly Sweet & Savory"
      },
      {
        "label": "Aroma",
        "value": "Fresh, Strong & Characteristic Onion Aroma"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>07122000</span>"
      }
    ]
  },
  {
    "id": 11,
    "name": "Onion Flakes",
    "slug": "onion-flakes",
    "category": "blended-masala",
    "categoryName": "Blended Masala",
    "categorySlug": "blended-masala",
    "origin": "Maharashtra, India",
    "grade": "Premium Kibbled",
    "description": "Crispy, dehydrated onion flakes that retain their sharp aroma and natural sweetness. Ideal for bulk food manufacturing, instant soups, and garnishes.",
    "packagingSizes": [
      {
        "label": "100g / 250g / 500g / 1kg",
        "type": "retail"
      },
      {
        "label": "5kg / 10kg / 25kg (Food-grade/Export cartons)",
        "type": "bulk"
      }
    ],
    "color": "#e8dcbe",
    "moq": "1 Metric Ton",
    "shelfLife": "18–24 Months",
    "moisture": "≤ 6%",
    "purity": "100% Pure",
    "hsCode": "07122000",
    "unsplashId": "/Photos/Onion Flakes.webp",
    "whatsappText": "Hi Blazze, I am interested in Onion Flakes.",
    "ingredients": "100% Dehydrated Onion",
    "processingDetails": [
      "Fresh onions carefully selected",
      "Peeled, washed & sliced",
      "Dehydrated under controlled conditions",
      "Cleaned, sorted & graded for uniform size",
      "No artificial colors or preservatives"
    ],
    "detailedSpecs": [
      {
        "label": "Purity",
        "value": "100% Pure (No Adulteration)"
      },
      {
        "label": "Moisture Content",
        "value": "≤ 6%"
      },
      {
        "label": "Flake Size",
        "value": "8–25 mm (or as required)"
      },
      {
        "label": "Total Ash",
        "value": "≤ 5%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "≤ 0.5%"
      },
      {
        "label": "Foreign Matter",
        "value": "Nil / Very Minimal"
      },
      {
        "label": "Appearance",
        "value": "Clean, Uniform Flakes"
      },
      {
        "label": "Taste",
        "value": "Mildly Sweet & Savory"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>07122000</span>"
      }
    ]
  },
  {
    "id": 12,
    "name": "Red Chilli Whole",
    "slug": "red-chilli-whole",
    "category": "whole-spices",
    "categoryName": "Whole Spices",
    "categorySlug": "whole-spices",
    "origin": "Guntur, Andhra Pradesh",
    "grade": "Stemless Export Quality",
    "description": "Premium dried whole red chillies with bold pungency and rich color. Hand-sorted and stemless to guarantee the finest visual and taste profile.",
    "packagingSizes": [
      {
        "label": "Vacuum Packing (Optional)",
        "type": "retail"
      },
      {
        "label": "25kg / 50kg PP Bags, Jute Bags",
        "type": "bulk"
      }
    ],
    "color": "#b22222",
    "moq": "20FT / 40FT Containers",
    "shelfLife": "12–18 Months",
    "moisture": "Max 10–12%",
    "purity": "99% Min",
    "hsCode": "09042110",
    "unsplashId": "/Photos/RED CHILLI.webp",
    "whatsappText": "Hi Blazze, I am interested in Whole Red Chilli.",
    "ingredients": "100% Whole Red Chilli",
    "processingDetails": [
      "Sun-Dried & Machine Cleaned",
      "Sorted for consistency and color",
      "FSSAI, ISO, HACCP Certifications As per requirement"
    ],
    "detailedSpecs": [
      {
        "label": "Varieties Available",
        "value": "Teja, S17, Byadgi, Kashmiri"
      },
      {
        "label": "Color",
        "value": "Deep Red to Bright Red"
      },
      {
        "label": "Taste",
        "value": "Hot & Spicy (Pungency level as per variety)"
      },
      {
        "label": "Moisture",
        "value": "Max 10–12%"
      },
      {
        "label": "Length",
        "value": "5 cm – 12 cm (depending on variety)"
      },
      {
        "label": "Stem",
        "value": "With/Without stem (as per requirement)"
      },
      {
        "label": "Foreign Matter",
        "value": "Max 1%"
      },
      {
        "label": "Broken Chillies",
        "value": "2–5% Max"
      },
      {
        "label": "Admixture",
        "value": "Nil / As per buyer requirement"
      },
      {
        "label": "Aflatoxin",
        "value": "Within permissible limits"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09042110</span>"
      }
    ]
  },
  {
    "id": 13,
    "name": "Kashmiri Chilli Whole",
    "slug": "kashmiri-chilli-whole",
    "category": "whole-spices",
    "categoryName": "Whole Spices",
    "categorySlug": "whole-spices",
    "origin": "India",
    "grade": "Premium Kashmiri Long / Mundi",
    "description": "Premium Kashmiri Whole Red Chilli, distinguished by its bright deep red color and low pungency, perfect for authentic mild Indian cuisine.",
    "packagingSizes": [
      {
        "label": "Vacuum Packing (Optional)",
        "type": "retail"
      },
      {
        "label": "25kg / 50kg PP Bags, Jute Bags",
        "type": "bulk"
      }
    ],
    "color": "#800000",
    "moq": "20FT / 40FT Containers",
    "shelfLife": "12–18 Months",
    "moisture": "Max 10%",
    "purity": "100% Pure",
    "hsCode": "09042110",
    "unsplashId": "/Photos/KASHMIRI RED.webp",
    "whatsappText": "Hi Blazze, I am interested in Whole Kashmiri Chillies.",
    "ingredients": "100% Premium Kashmiri Whole Red Chilli",
    "processingDetails": [
      "Sun-Dried",
      "Machine Cleaned & Sortex Cleaned",
      "FSSAI, ISO, HACCP Certifications As per requirement"
    ],
    "detailedSpecs": [
      {
        "label": "Type",
        "value": "Kashmiri Long / Kashmiri Mundi"
      },
      {
        "label": "Color",
        "value": "Bright Deep Red (High ASTA Color Value)"
      },
      {
        "label": "Pungency (SHU)",
        "value": "Low to Medium"
      },
      {
        "label": "Moisture",
        "value": "Max 10%"
      },
      {
        "label": "Total Ash",
        "value": "Max 7%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "Max 1.3%"
      },
      {
        "label": "Foreign Matter",
        "value": "Max 0.5%"
      },
      {
        "label": "Broken",
        "value": "Max 2%"
      },
      {
        "label": "Admixture",
        "value": "Nil"
      },
      {
        "label": "Aflatoxin",
        "value": "Within international permissible limits"
      },
      {
        "label": "Pesticide Residue",
        "value": "As per EU/ASTA standards"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09042110</span>"
      }
    ]
  },
  {
    "id": 14,
    "name": "Turmeric Whole (Fingers)",
    "slug": "turmeric-whole",
    "category": "whole-spices",
    "categoryName": "Whole Spices",
    "categorySlug": "whole-spices",
    "origin": "India",
    "grade": "Premium Whole Turmeric Fingers",
    "description": "Carefully harvested and polished turmeric fingers boasting a rich curcumin content. Used extensively in medicinal extracts and global food processing.",
    "packagingSizes": [
      {
        "label": "Custom Retail",
        "type": "retail"
      },
      {
        "label": "25kg / 50kg PP Bags, Jute Bags",
        "type": "bulk"
      }
    ],
    "color": "#d4af37",
    "moq": "20FT / 40FT Containers",
    "shelfLife": "18–24 Months",
    "moisture": "Max 10%",
    "purity": "100% Pure",
    "hsCode": "09103020",
    "unsplashId": "/Photos/TURMERIC.webp",
    "whatsappText": "Hi Blazze, I am interested in Turmeric Fingers.",
    "ingredients": "100% Premium Whole Turmeric Fingers",
    "processingDetails": [
      "Boiled, Sun-Dried",
      "Polished (Double / Single Polished as required)",
      "Machine Cleaned",
      "FSSAI, ISO, HACCP Certifications As per requirement"
    ],
    "detailedSpecs": [
      {
        "label": "Varieties",
        "value": "Salem / Rajapuri / Erode"
      },
      {
        "label": "Color",
        "value": "Bright Yellow to Deep Golden"
      },
      {
        "label": "Curcumin Content",
        "value": "2% – 5% (as per variety)"
      },
      {
        "label": "Moisture",
        "value": "Max 10%"
      },
      {
        "label": "Total Ash",
        "value": "Max 8%"
      },
      {
        "label": "Acid Insoluble Ash",
        "value": "Max 1.5%"
      },
      {
        "label": "Foreign Matter",
        "value": "Max 0.5%"
      },
      {
        "label": "Polish",
        "value": "Double / Single Polished (as required)"
      },
      {
        "label": "Admixture",
        "value": "Nil"
      },
      {
        "label": "Aflatoxin",
        "value": "Within permissible limits"
      },
      {
        "label": "Pesticide Residue",
        "value": "As per EU/ASTA standards"
      },
      {
        "label": "HS Code",
        "value": "<span class='font-mono text-[#F5A623]'>09103020</span>"
      }
    ]
  },
  {
    "id": 15,
    "name": "Rice (Basmati / Non-Basmati)",
    "slug": "basmati-rice",
    "category": "grains",
    "categoryName": "Grains",
    "categorySlug": "grains",
    "origin": "Punjab, Haryana & Andhra Pradesh, India",
    "grade": "Premium Export Grade",
    "varieties": [
      "1121 Basmati",
      "1509 Basmati",
      "1401 Basmati",
      "1718 Basmati",
      "IR64 (Non-Basmati)",
      "Sona Masoori",
      "PR11",
      "Swarna Rice"
    ],
    "description": "We export premium quality Basmati and Non-Basmati rice varieties sourced from the finest rice-growing regions of India. Our Basmati rice (1121, 1509, 1401, 1718) is known for its extra-long grains (6.5–8.5mm+), natural aroma, 2x elongation on cooking, and fluffy non-sticky texture. Non-Basmati varieties include IR64, Sona Masoori, PR11, and Swarna Rice for diverse global markets.",
    "packagingSizes": [
      { "label": "1kg", "type": "retail" },
      { "label": "5kg", "type": "retail" },
      { "label": "10kg", "type": "retail" },
      { "label": "20kg Export Bag", "type": "bulk" },
      { "label": "25kg Export Bag", "type": "bulk" },
      { "label": "50kg Export Bag", "type": "bulk" }
    ],
    "color": "#fdfdfa",
    "moq": "1x20ft Container",
    "shelfLife": "12–24 Months (stored properly)",
    "moisture": "≤ 12–14%",
    "purity": "Sortex Cleaned",
    "hsCode": "10063020",
    "unsplashId": "/Photos/RICE.webp",
    "whatsappText": "Hi Blazze, I am interested in Basmati / Non-Basmati Rice imports.",
    "ingredients": "100% Natural Rice Grain (Raw / Steam / Parboiled) — No additives or preservatives",
    "processingDetails": [
      "Sortex cleaned using advanced color sorting machines",
      "Silky / Double Polished finish available on request",
      "Hygienically processed under strict quality control",
      "Available as Raw, Steam, or Parboiled variants",
      "Private labeling supported with PP, Non-Woven, or BOPP bags"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Basmati / Non-Basmati Rice" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Raw / Steam / Parboiled" },
      { "label": "Color", "value": "White / Creamy White / Golden (as per type)" },
      { "label": "Grain Type", "value": "Long Grain / Medium Grain / Short Grain" },
      { "label": "Crop Year", "value": "Latest Crop / As per availability" },
      { "label": "Moisture Content", "value": "≤ 12–14%" },
      { "label": "Broken Grains", "value": "1% / 5% / 10% / 25% (as per requirement)" },
      { "label": "Foreign Matter", "value": "Nil / ≤ 0.5%" },
      { "label": "Damaged / Discolored Grains", "value": "≤ 1–2%" },
      { "label": "Chalky Grains", "value": "As per grade" },
      { "label": "Paddy Grains", "value": "Nil" },
      { "label": "Admixture", "value": "As per buyer requirement" },
      { "label": "Average Grain Length (Basmati)", "value": "6.5 mm – 8.5 mm+" },
      { "label": "Length After Cooking", "value": "2x elongation" },
      { "label": "Aroma", "value": "Natural Basmati Aroma (for basmati varieties)" },
      { "label": "Texture", "value": "Non-sticky, fluffy after cooking" },
      { "label": "Shelf Life", "value": "12–24 Months (if stored properly)" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>10063020</span>" }
    ]
  },
  {
    "id": 16,
    "name": "Wheat",
    "slug": "wheat",
    "category": "grains",
    "categoryName": "Grains",
    "categorySlug": "grains",
    "origin": "Madhya Pradesh, Punjab & Rajasthan, India",
    "grade": "Milling Grade 1",
    "varieties": [
      "Sharbati Wheat",
      "Lokwan Wheat",
      "MP Wheat",
      "Durum Wheat"
    ],
    "description": "Our export-grade wheat is sourced from premium wheat-growing belts of India. We supply Hard and Soft wheat varieties (Sharbati, Lokwan, MP Wheat, Durum) suited for flour milling, semolina production, and industrial food processing. Protein content 10–13%, moisture ≤12%, with consistent quality and zero weevilled grains guaranteed.",
    "packagingSizes": [
      { "label": "5kg", "type": "retail" },
      { "label": "10kg", "type": "retail" },
      { "label": "25kg Retail Bag", "type": "retail" },
      { "label": "25kg Bulk Bag", "type": "bulk" },
      { "label": "50kg Bulk Bag (PP / Jute)", "type": "bulk" }
    ],
    "color": "#e8cf94",
    "moq": "1x20ft Container",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "99% Min",
    "hsCode": "10019910",
    "unsplashId": "/Photos/WHEAT IMAGE.webp",
    "whatsappText": "Hi Blazze, I am interested in bulk Wheat imports.",
    "ingredients": "100% Natural Wheat Grain — Machine cleaned, no additives or chemicals",
    "processingDetails": [
      "Machine cleaned and size-graded for uniformity",
      "Dust and impurities removed at every processing stage",
      "Hygienically processed under quality control",
      "Available in Hard Wheat and Soft Wheat (Durum) variants",
      "Private labeling available with PP, Jute, or Export-grade bags"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Wheat" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Hard Wheat / Soft Wheat" },
      { "label": "Color", "value": "Golden Brown" },
      { "label": "Grain Type", "value": "Medium to Hard Texture" },
      { "label": "Crop Year", "value": "Latest Crop / As per availability" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Protein Content", "value": "10% – 13% (depending on variety)" },
      { "label": "Foreign Matter", "value": "≤ 1%" },
      { "label": "Damaged Grains", "value": "≤ 2%" },
      { "label": "Broken Grains", "value": "≤ 2%" },
      { "label": "Shriveled Grains", "value": "≤ 3%" },
      { "label": "Weevilled Grains", "value": "Nil / Minimal" },
      { "label": "Grain Hardness", "value": "Medium to Hard (for better flour yield)" },
      { "label": "Texture", "value": "Firm and free-flowing" },
      { "label": "Shelf Life", "value": "12 Months (under proper storage)" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>10019910</span>" }
    ]
  },

  {
    "id": 17,
    "name": "Chana Dal / Split Chickpea",
    "slug": "chana-dal",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Maharashtra, India",
    "grade": "Sortex Cleaned",
    "description": "Split baby chickpeas (Bengal Gram) characterized by a mild, nutty flavor and high protein density. Machine sorted and highly polished for premium retail markets.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#ffd966",
    "moq": "5 Metric Tons",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07132000",
    "unsplashId": "/Photos/Chana Dal.webp",
    "whatsappText": "Hi Blazze, I am interested in Chana Dal.",
    "ingredients": "100% Split Bengal Gram (Chana Dal)",
    "processingDetails": [
      "Machine cleaned & sorted",
      "Properly dehusked and split",
      "Polished (if required)",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Chana Dal (Split Bengal Gram)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Split & Polished / Unpolished" },
      { "label": "Color", "value": "Bright Yellow" },
      { "label": "Taste & Aroma", "value": "Mild, Nutty, Fresh & Clean" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Broken/Fragments", "value": "≤ 2–3%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Damaged / Discolored Content", "value": "≤ 1–2%" },
      { "label": "Weevilled Grains", "value": "Nil / Minimal" },
      { "label": "Grain Size", "value": "Uniform & Well-Split" },
      { "label": "Shelf Life", "value": "12 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07132000</span>" }
    ]
  },
  {
    "id": 18,
    "name": "Mung Dal / Mung Beans",
    "slug": "mung-dal",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Rajasthan, India",
    "grade": "Premium Sortex",
    "description": "Dehusked and split mung beans delivering a sweet, soft, and easy-to-digest protein source. An essential pulse for global health food brands.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#eeb422",
    "moq": "5 Metric Tons",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07133100",
    "unsplashId": "/Photos/mung dal.webp",
    "whatsappText": "Hi Blazze, I am interested in Mung Dal.",
    "ingredients": "100% Split Green Gram (Moong Dal)",
    "processingDetails": [
      "Machine cleaned & graded",
      "Dehusked and split properly",
      "Polished (if required)",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Moong Dal (Split Green Gram)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Split Washed / Split Chilka (with skin)" },
      { "label": "Color", "value": "Yellow (Washed) / Green & Yellow (Chilka)" },
      { "label": "Taste & Aroma", "value": "Mild, Light, Slightly Sweet & Natural" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Broken/Fragments", "value": "≤ 2–3%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Damaged/Discolored", "value": "≤ 1–2%" },
      { "label": "Grain Size", "value": "Uniform & Well-Split" },
      { "label": "Texture", "value": "Smooth & Firm" },
      { "label": "Shelf Life", "value": "12 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07133100</span>" }
    ]
  },
  {
    "id": 19,
    "name": "Kabuli Chana / Chickpeas",
    "slug": "kabuli-chana",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Madhya Pradesh, India",
    "grade": "Bold Size (12mm)",
    "description": "Premium large, light-colored chickpeas. Perfect for Middle Eastern hummus, salads, and canning industries demanding uniform grain size.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#f5deb3",
    "moq": "1x20ft Container",
    "shelfLife": "12–24 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07132000",
    "unsplashId": "/Photos/Kabuli chana.webp",
    "whatsappText": "Hi Blazze, I am interested in Kabuli Chana (Chickpeas).",
    "ingredients": "100% Whole White Chickpeas",
    "processingDetails": [
      "Machine cleaned & graded",
      "Size sorted for uniformity",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Kabuli Chana (White Chickpeas)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Whole Chickpeas" },
      { "label": "Color", "value": "Creamy White" },
      { "label": "Taste & Aroma", "value": "Mild, Nutty, Rich & Natural" },
      { "label": "Count per Ounce (OZ)", "value": "40/42, 42/44, 44/46, 58/60, 60/62" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Broken/Split", "value": "≤ 1%" },
      { "label": "Damaged/Discolored", "value": "≤ 1–2%" },
      { "label": "Size & Shape", "value": "Large & Uniform, Round & Smooth" },
      { "label": "Shelf Life", "value": "12–24 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07132000</span>" }
    ]
  },
  {
    "id": 20,
    "name": "Urad Dal / Black Gram",
    "slug": "urad-dal",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Andhra Pradesh, India",
    "grade": "Sortex Cleaned",
    "description": "Split and skinned black gram. High in fiber and famously used to produce the smooth batters required for traditional South Indian cuisines.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#f2f2e8",
    "moq": "5 Metric Tons",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07133100",
    "unsplashId": "/Photos/Urad dal.webp",
    "whatsappText": "Hi Blazze, I am interested in Urad Dal.",
    "ingredients": "100% Split Black Gram (Urad Dal)",
    "processingDetails": [
      "Machine cleaned & graded",
      "Dehusked and properly split",
      "Polished (if required)",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Urad Dal (Black Gram Split)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Split Washed / Split Chilka (with skin)" },
      { "label": "Color", "value": "White (Washed) / Black & White (Chilka)" },
      { "label": "Taste & Aroma", "value": "Rich, Creamy, Nutty & Natural" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Broken/Fragments", "value": "≤ 2–3%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Damaged/Discolored", "value": "≤ 1–2%" },
      { "label": "Grain Size", "value": "Uniform & Well-Split" },
      { "label": "Shelf Life", "value": "12 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07133100</span>" }
    ]
  },
  {
    "id": 21,
    "name": "Rajma / Kidney Beans",
    "slug": "rajma",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Jammu, India",
    "grade": "Kashmiri Red / Chitra",
    "description": "Vivid red or speckled kidney beans renowned for their rich, meaty texture. A staple ingredient in both traditional Indian and Latin American dishes.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#6c2828",
    "moq": "1x20ft Container",
    "shelfLife": "12–24 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07133300",
    "unsplashId": "/Photos/RedWhite Rajma.webp",
    "whatsappText": "Hi Blazze, I am interested in Rajma (Kidney Beans).",
    "ingredients": "100% Whole Kidney Beans",
    "processingDetails": [
      "Machine cleaned & graded",
      "Size sorted for uniformity",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Red Rajma (Kidney Beans)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Whole Beans" },
      { "label": "Color", "value": "Deep Red to Dark Red" },
      { "label": "Taste & Aroma", "value": "Rich, Creamy, Slightly Sweet & Natural" },
      { "label": "Size", "value": "Small / Medium / Large (Even size & shape)" },
      { "label": "Grading", "value": "As per buyer requirement" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Broken/Split", "value": "≤ 1–2%" },
      { "label": "Damaged/Discolored", "value": "≤ 1–2%" },
      { "label": "Shape", "value": "Kidney-shaped, clean & shiny" },
      { "label": "Shelf Life", "value": "12–24 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07133300</span>" }
    ]
  },
  {
    "id": 22,
    "name": "Masoor Dal / Red Lentils",
    "slug": "masoor-dal",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Uttar Pradesh, India",
    "grade": "Sortex Red Lentils",
    "description": "Split red lentils that cook incredibly fast into a soft, earthy puree. An export favorite due to its versatility and high global demand.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#d95c25",
    "moq": "5 Metric Tons",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07134000",
    "unsplashId": "/Photos/Masoor Dal.webp",
    "whatsappText": "Hi Blazze, I am interested in Masoor Dal.",
    "ingredients": "100% Red Lentils",
    "processingDetails": [
      "Machine cleaned & graded",
      "Dehusked and properly split",
      "Polished (if required)",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Masoor Dal (Red Lentils)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Split Washed / Whole (Sabut Masoor)" },
      { "label": "Color", "value": "Orange-Red (Split) / Brown (Whole)" },
      { "label": "Taste & Aroma", "value": "Mild, Earthy, Slightly Sweet & Natural" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Broken/Fragments", "value": "≤ 2–3%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Damaged/Discolored", "value": "≤ 1–2%" },
      { "label": "Grain Size", "value": "Uniform & Well-Split" },
      { "label": "Shelf Life", "value": "12 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07134000</span>" }
    ]
  },
  {
    "id": 23,
    "name": "Soyabean / Glycine Max",
    "slug": "soyabean",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Madhya Pradesh, India",
    "grade": "Non-GMO Export Grade",
    "description": "Nutritionally dense soybeans perfect for tofu manufacturing, soy milk extraction, and global animal feed formulations. Guaranteed Non-GMO.",
    "packagingSizes": [
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#e8d394",
    "moq": "1x20ft Container",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "12019000",
    "unsplashId": "/Photos/Soyabean.webp",
    "whatsappText": "Hi Blazze, I am interested in Non-GMO Soyabean.",
    "ingredients": "100% Whole Soybeans",
    "processingDetails": [
      "Machine cleaned & graded",
      "Sorted to remove impurities",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Soyabean" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Whole Soybeans" },
      { "label": "Color", "value": "Yellow" },
      { "label": "Taste & Aroma", "value": "Mild, Nutty & Natural" },
      { "label": "Protein Content", "value": "36% – 40%" },
      { "label": "Oil Content", "value": "18% – 20%" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Broken Grains", "value": "≤ 1–2%" },
      { "label": "Shape & Size", "value": "Round, Smooth, Uniform & Well-Filled" },
      { "label": "Shelf Life", "value": "12 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>12019000</span>" }
    ]
  },
  {
    "id": 24,
    "name": "Toor Dal / Pigeon Peas",
    "slug": "toor-dal",
    "category": "pulses",
    "categoryName": "Pulses",
    "categorySlug": "pulses",
    "origin": "Maharashtra, India",
    "grade": "Premium Sortex",
    "description": "Split pigeon peas boasting a slightly sweet, nutty flavor. Processed using advanced milling techniques to ensure quick cooking times and high yield.",
    "packagingSizes": [
      { "label": "1kg / 5kg / 10kg", "type": "retail" },
      { "label": "25kg / 50kg (PP Bags / Jute / Export-grade)", "type": "bulk" }
    ],
    "color": "#f5c342",
    "moq": "5 Metric Tons",
    "shelfLife": "12 Months (under proper storage conditions)",
    "moisture": "≤ 12%",
    "purity": "≥ 99%",
    "hsCode": "07136000",
    "unsplashId": "/Photos/Toor Dal.webp",
    "whatsappText": "Hi Blazze, I am interested in Toor Dal.",
    "ingredients": "100% Split Pigeon Peas (Arhar Dal)",
    "processingDetails": [
      "Machine cleaned & graded",
      "Dehusked and properly split",
      "Polished (if required)",
      "Hygienically processed under strict quality control"
    ],
    "detailedSpecs": [
      { "label": "Product Name", "value": "Toor Dal (Arhar Dal)" },
      { "label": "Brand", "value": "Blazze / Kit Bit" },
      { "label": "Type", "value": "Split & Polished / Unpolished" },
      { "label": "Color", "value": "Yellow" },
      { "label": "Taste & Aroma", "value": "Mild, Nutty, Rich & Natural" },
      { "label": "Moisture Content", "value": "≤ 12%" },
      { "label": "Purity", "value": "≥ 99%" },
      { "label": "Broken/Fragments", "value": "≤ 2–3%" },
      { "label": "Foreign Matter", "value": "≤ 0.5%" },
      { "label": "Damaged/Discolored", "value": "≤ 1–2%" },
      { "label": "Grain Size", "value": "Uniform & Well-Split" },
      { "label": "Shelf Life", "value": "12 Months" },
      { "label": "HS Code", "value": "<span class='font-mono text-[#F5A623]'>07136000</span>" }
    ]
  }
];
