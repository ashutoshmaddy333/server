const products = [
    {
        name: "Elegant Gold Ring",
        description: "A beautifully crafted gold ring with intricate detailing.",
        price: 299.99,
        discountPrice: 249.99,
        category: "Ring",
        status: "active",
        stock: 5,
        material: "Gold",
        weight: 5.2,
        dimensions: { length: 20, width: 10, height: 5, unit: "mm" },
        tags: ["gold", "ring", "luxury", "wedding"],
        featured: true,
        owner: "65a8d5f13a456b9a6f12cdef", // Example ObjectId
        images: [
            {
                filename: "gold_ring_1.jpg",
                url: "https://example.com/images/gold_ring_1.jpg",
                public_id: "gold_ring_1"
            }
        ],
        reviews: []
    },
    {
        name: "Sapphire Necklace",
        description: "A mesmerizing sapphire necklace set in sterling silver.",
        price: 499.99,
        discountPrice: 399.99,
        category: "Necklace",
        status: "active",
        stock: 3,
        material: "Sterling Silver",
        weight: 12.5,
        dimensions: { length: 450, width: 5, height: 2, unit: "mm" },
        tags: ["sapphire", "necklace", "luxury", "gemstone"],
        featured: true,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "sapphire_necklace.jpg",
                url: "https://example.com/images/sapphire_necklace.jpg",
                public_id: "sapphire_necklace"
            }
        ],
        reviews: []
    },
    {
        name: "Diamond Stud Earrings",
        description: "Classic diamond studs set in 18K white gold.",
        price: 899.99,
        discountPrice: 799.99,
        category: "Earrings",
        status: "active",
        stock: 10,
        material: "White Gold",
        weight: 3.1,
        dimensions: { length: 8, width: 8, height: 4, unit: "mm" },
        tags: ["diamond", "earrings", "luxury", "wedding"],
        featured: false,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "diamond_stud_earrings.jpg",
                url: "https://example.com/images/diamond_stud_earrings.jpg",
                public_id: "diamond_stud_earrings"
            }
        ],
        reviews: []
    },
    {
        name: "Silver Charm Bracelet",
        description: "A stylish silver charm bracelet with customizable charms.",
        price: 199.99,
        discountPrice: 149.99,
        category: "Bracelet",
        status: "active",
        stock: 8,
        material: "Sterling Silver",
        weight: 7.8,
        dimensions: { length: 180, width: 8, height: 3, unit: "mm" },
        tags: ["bracelet", "silver", "charm", "fashion"],
        featured: true,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "silver_charm_bracelet.jpg",
                url: "https://example.com/images/silver_charm_bracelet.jpg",
                public_id: "silver_charm_bracelet"
            }
        ],
        reviews: []
    },
    {
        name: "Pearl Drop Earrings",
        description: "Elegant pearl drop earrings with a timeless design.",
        price: 349.99,
        discountPrice: 299.99,
        category: "Earrings",
        status: "active",
        stock: 6,
        material: "Pearl & Gold",
        weight: 4.5,
        dimensions: { length: 12, width: 6, height: 5, unit: "mm" },
        tags: ["pearl", "earrings", "gold", "elegant"],
        featured: false,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "pearl_drop_earrings.jpg",
                url: "https://example.com/images/pearl_drop_earrings.jpg",
                public_id: "pearl_drop_earrings"
            }
        ],
        reviews: []
    },
    {
        name: "Ruby Gold Ring",
        description: "A stunning gold ring with a radiant ruby centerpiece.",
        price: 599.99,
        discountPrice: 549.99,
        category: "Ring",
        status: "active",
        stock: 4,
        material: "Gold & Ruby",
        weight: 6.7,
        dimensions: { length: 22, width: 11, height: 6, unit: "mm" },
        tags: ["ruby", "gold", "ring", "luxury"],
        featured: true,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "ruby_gold_ring.jpg",
                url: "https://example.com/images/ruby_gold_ring.jpg",
                public_id: "ruby_gold_ring"
            }
        ],
        reviews: []
    },
    {
        name: "Emerald Pendant",
        description: "A dazzling emerald pendant set in 18K gold.",
        price: 449.99,
        discountPrice: 399.99,
        category: "Necklace",
        status: "active",
        stock: 7,
        material: "Gold & Emerald",
        weight: 9.4,
        dimensions: { length: 30, width: 12, height: 5, unit: "mm" },
        tags: ["emerald", "pendant", "gold", "luxury"],
        featured: false,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "emerald_pendant.jpg",
                url: "https://example.com/images/emerald_pendant.jpg",
                public_id: "emerald_pendant"
            }
        ],
        reviews: []
    },
    {
        name: "Rose Gold Bangle",
        description: "A chic rose gold bangle with a sleek design.",
        price: 299.99,
        discountPrice: 269.99,
        category: "Bracelet",
        status: "active",
        stock: 9,
        material: "Rose Gold",
        weight: 8.5,
        dimensions: { length: 190, width: 10, height: 4, unit: "mm" },
        tags: ["bangle", "rose gold", "bracelet", "fashion"],
        featured: true,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "rose_gold_bangle.jpg",
                url: "https://example.com/images/rose_gold_bangle.jpg",
                public_id: "rose_gold_bangle"
            }
        ],
        reviews: []
    },
    {
        name: "Crystal Anklet",
        description: "A delicate anklet adorned with sparkling crystals.",
        price: 129.99,
        discountPrice: 99.99,
        category: "Other",
        status: "active",
        stock: 12,
        material: "Silver & Crystal",
        weight: 3.6,
        dimensions: { length: 220, width: 5, height: 2, unit: "mm" },
        tags: ["anklet", "crystal", "silver", "fashion"],
        featured: false,
        owner: "65a8d5f13a456b9a6f12cdef",
        images: [
            {
                filename: "crystal_anklet.jpg",
                url: "https://example.com/images/crystal_anklet.jpg",
                public_id: "crystal_anklet"
            }
        ],
        reviews: []
    }
];

module.exports = { data: products };
