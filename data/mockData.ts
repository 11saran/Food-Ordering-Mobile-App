export type Category = {
  id: string;
  name: string;
  image: string;
};

export type FoodItem = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  tag?: 'Veg' | 'Non-Veg';
};

export const categories: Category[] = [
  { id: '1', name: 'Pizza', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5dAW4nM62l3aUXR_je7VA4mbQCoTLy1DvBu02AUdO9ec9tieZ-8MPRDBX3CVSbKbGhVBY3L58gvwwZp2J6REk7lALNSJEfm3hB3BrwGTszpMp4MiN1wtOajarHzzHnlm5FJssIF_BiMMivQKxW1R2NiEsS00ldhhi7DRPxZCvIMKY1np13sZDaMFX5oz-1ekLAer98igd4stE7ocSTASfzVhicwk3ZFDV_aWUCCsGTnSPESf1tzOL6a8lZsDSIEau7R-yMOGx5vp' },
  { id: '2', name: 'Burger', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO-AwJOQHI6EEcYQQmFYo7YnqH6yvDNbUTnok66skWrNHwYjar98ytBf2uX0dDIEoAtSSbxQiGdXa1WADHNQvlS4WjmZKGG2a_JimjLe0r-ossfHR0NsukC8Z4SbBQXZUAzwdD-Wm4VmPt0AelnO7TgY6eEXqo4zWPMIiiOJc1SEm0i5uCDfD0Gb1_Viqixco_zZDJIABrsKDjA6IzBUQs_s0-eJ2Twv271k9TIdPs6rXOg57JqivaHdy1p1KzOINGBZ54GeITrHS9' },
  { id: '3', name: 'Sushi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtkaZ_yxqvhf_hKjlrD48kRhFVEPC8a8AH1VnSzq82Z6UDByCkDPKzziycrNDfwpFuYX_aSZzCuHhqgfqviHS7dVRTZ2LQal9Iy56Axv-EgZbS9vnTGfyutIW5weBJ3R2Gk-wInU_aPrzESCOKIqlW7-m7bTY_Uw4tHUL3gvFbMKZOmfCuIgoDY25PDY8hYLmHihk3if0gVuLvVG83Lktt3UH22LyhZsWAfxn4lOvOhB8HOj78B3Qw04kWcvJna2sR9YyJ1RN_ysNP' },
  { id: '4', name: 'Desserts', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcIANqYeLEFmSGUjfeGeMXspuJJxlTZPPmXm15LAFPbXfxPZu3a3x5c6Vw3gqSe6yqRX1LApxoLTbhnC20ULXYot54NyA3CeAhPmwLdXqQSbvbDH7dDBXAzL9B47o64V50ztb4_M7I-PDwOdCviSebp1j3la2OIbYOownW1SjbIMHxXx3ewNqfDoCBobV2-Ccf-voVWmzRTJBfxU2rJZRDYQLbFJxyfsfaAB5qH7wNOjBhfyGpXTtd4WMCwDzvNJ7jrPihCrFWkuAS' },
  { id: '5', name: 'Tacos', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVRte1XgCVZMULSbH1YEvp5OUq_WPpBRsygp5Mf7YvDdcfe5_VvIuaUS82Pt61cD1kZ5bXjD3bHp1r8KLrJSqdL5_2HlW2hSWv57DYCCp6SSWI2PNur_8wq9N7rIKhrFH_SUp--C0E5AjAhTs42UHEPyQviI6T-fiAzS-ifI-6pDeGh1PoECbyvZ1nNVjCsdFIl_AbngH-QEr7WTUBAvD2JPZRaFZLDIlQ9n3WWTI0FhuOR9UArngWM7-rL8qEpVOxg2Bt4bh89iny' },
  { id: '6', name: 'Drinks', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_q9EPOA9rWgGSxMLxpbGbb9LzW8I3WcHqPZg5suOd6YEhXGOenpFlYRkQi1gC413NaoHGXgUIim7867gIY1mfZRQLtOnUxW8YrV3-VRxtCv-ZFFj01i1WQdRW00L1Qb3yC0c5qstrDWI3FBbz3M9UFnn3DkDR3LA9eaySXG9lTytHuVo98fJRQx0R3lpAo6-FiQKCreh3mYkLxmb1k8KJGz2avaQW_reDiBQRYe43OGP-CELqxB0Tc68Qtq2tcRxeg_AlId9UCqlh' },
  { id: '7', name: 'Salad', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWno288ylujv7HEDDevyv-vi9d0wh2g_Y3u6znbpk1c-8N89_STXPI5qJSN8KZy6vCoCPEfRfPA1EbdPJf2S7x5aBMSsOLq4CULMX3wOS0BxCUVqIyjKdr_eA3KnHZR4UilO19Oga8wjtlHL6FJm50nHIxr2VHXzM6XvHnuD9SqVOhviI6ZZjv1kPyf5Ma9fgjpzs9iwXPZZtlQrzQwVLfNjQFDFLFwWyQRT-FNzmBIuIl787fB5kxe9oCbylMbEPkEUjND-Dz7mzo' },
  { id: '8', name: 'Pasta', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrLIzVfgZ3h7riRXafS3pBx4bQWNdvsz7CEiOPp3bzTw-h_V9YkH0wB4hotCPj0uF-IxFNKtScqY57P6NjzNFdwWn0EeqzbNrzxT5QF1n4LD7-dISl-tcofmcmkdxTGM5kM0dnqC_rLNTqwUMUvwaugWybLHAe4xzs4WxiJ1fhO6fU7VCq9BnmO-M2X4fqmzgDsLp7_YZNoamP81xOosowNVDt4duj25srpTbSCaNeC1L5ab6nSpo3erhGSUH_v4drmM8O0qSM8Mcr' },
];

export const foodItems: FoodItem[] = [
  // Pizzas
  { 
    id: 'p1', 
    categoryId: '1', 
    name: 'Margherita Pizza', 
    price: 2150.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8ySgDAIVlDROj4XSTKvI9ihaK5V7d-Qc09yJ7QXcybL2h8Tr8H25Q8d4XGyU1Fn3M3uSd-ZcVx3m9pRwPPJo6A2k2g9b3xvKxHwFCk4byqIz_fN8COmZ-joYIZzda3nREOxCIK8LxnZVRpcTyj6_ic-2_N-r2hCSWS8l9pLsiOFBjcQpOoVNhEJ52ExduLtVBAOVi-oOeBYOqeeK-kFbYdk5tNUZY6ybO5xJszRq2TcsKyhvieSr57E5N4JhsNFpEHyryWAtNj2x',
    description: 'Classic delight with 100% real mozzarella cheese and fresh basil leaves.',
    tag: 'Veg'
  },
  { 
    id: 'p2', 
    categoryId: '1', 
    name: 'Pepperoni Feast', 
    price: 3450.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM8DYUrG9EbA23aNv2LrDXXJ6iq0A9Bb3qtBavvfY38uIj3VXvEJZtpHIjWsSqndOh-cme5j5r58C8jF8tsp8AHJlgC103KvIJvkSlekoWAYYHMz4T6-k4lYawk-lt9mGWobBaWZE2-yO6Ikz2EWkxTVGT0GkW9aHA4ayrihlj8iCBk-m-kvxVfgPprwSHdlQRaBqJ_FiDLqM_yTViQG2Lb6y5AGHtuR13H1g0jTMu0LAl3Whuq_Zb94KvHfiaJRwoxNFFthVSkYw0',
    description: 'Double portion of spicy pepperoni and extra mozzarella on a thin crust.',
    tag: 'Non-Veg'
  },
  { 
    id: 'p3', 
    categoryId: '1', 
    name: 'BBQ Chicken', 
    price: 2950.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZ05qzbri7xc3iRdtLVGnzTq_GHQxU6_UZW8GwtXlbrtIg0mZ_EDevfY11CwP5tKJ_CXt8GcyfT6IR_2d4k3Df29sU3WipdghCvAqdp1zrzc2nRKW_mJZ2eqE_4fDgpsspTlahPbDbNyLD7sLase6ER4WTonklCUf-InBQml7F2zSodp8yc6eYS1S2halFsfnJ1KOe_vEXFhoYIOkmh8yLz01omAmwFmvPj5EbHuYB2zD2yZrsD5qZA7KqJceMvYziUMykcW-djwM',
    description: 'Grilled chicken, smoky BBQ sauce, red onions, and fresh cilantro.',
    tag: 'Non-Veg'
  },
  { 
    id: 'p4', 
    categoryId: '1', 
    name: 'Veggie Supreme', 
    price: 2650.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPdP9c7p3HEzRzFu6JcB4DdppHqDWn9nb1NkKW6tryiopAknp-f8Hzj82TNYpysD7jGlD2AplE9begIaZKcEUno2YijPXRriV_dMTNgYzLdmBeSeOJsyU6jjjmyMuAkaZ9ypupRi89xAFul4GszPykJIUjO51C2mOLsqs5zOupBVCUqdGpBE7UYORXv86HURxyiZSK6gzcMuov6l2myKpAuvSHBc_Sml-jKhK_aZS2GsC_ZxnHFI-WXeSM5Pa_UM7guCrWqIwbDTmo',
    description: 'Loaded with bell peppers, mushrooms, onions, olives, and sweet corn.',
    tag: 'Veg'
  },
  
  // Burgers (Category 2)
  { 
    id: 'b1', 
    categoryId: '2', 
    name: 'Classic Cheeseburger', 
    price: 1850.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDpcHmdjjRScUIdGfB_5-Fsh9PoEh6L7KSNf43EvLqVZ8dwL9pWggt5V9bR8QPJDxv3DtPQNJUWoeYwpNvdwPbl3kL8nNubvN4T1TdPbtfyTNZxmAS6-V8_-PjKiHSAof0IIH-6DnozCRH4JMizPGE_aRV_pCaVGz0BedjslRbOFbJ6tXuVi4ssp0oXSQCSqF24mDtN_3sTJyEEi0ilZlA6R9VPygpeFObMYcTcgMxTmk7t8BM-g9ddX7qm4nZ6jvSufbI3DzzTdyr',
    description: 'Juicy prime beef patty, melted cheddar, fresh lettuce, and tomatoes on a toasted brioche bun.',
    tag: 'Non-Veg'
  },
  { 
    id: 'b2', 
    categoryId: '2', 
    name: 'Crispy Chicken Burger', 
    price: 1650.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtKJDDZhLNCywV6uvPh2G8IHyUkotksSsGrv-itzxCvFi1I2g-SiUZ0z0aC_FbFc0xVjdibjNGJANVe0wDZXDrqqNOGtcf_8goUO1mTJLbOpFSby2krhwnt3x3JVjhmNJ-7AbwHuD-rgf6-13kn9fwGmtcNo5v-WryPgc76l5IaHaeQp-YKd2zvSOR4DjXtYpLj4DNxMeH_z402DsPVWaEd8onjucMVVjVn2L-ZWO9kbmLTNWOKWbMygE_TK1VX5t7B1iViNweUdgK',
    description: 'Crispy fried chicken breast, spicy mayo, pickles, and shredded slaw.',
    tag: 'Non-Veg'
  },
  { 
    id: 'b3', 
    categoryId: '2', 
    name: 'Garden Veggie Burger', 
    price: 1450.00, 
    image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?w=600&h=400&fit=crop',
    description: 'Hearty plant-based patty with avocado, sprouts, and vegan aioli.',
    tag: 'Veg'
  },
  
  // Drinks (Category 6)
  { 
    id: 'd1', 
    categoryId: '6', 
    name: 'Strawberry Mojito', 
    price: 1150.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiYYn5BXBpAiwC7zC7acbgFj03-AVbvT5HbwkrAYNAD0IaEKOucuvtV_M3_95EfXpCfr3QD6Kkv77fwz1ZKjlebPDzecVW15T6wUSZ-7xp5OxzcYOzNIJ1jlzqekpMDNOrkeVctnJ4IIQQZL5D-5GM-SJs2gffnl0WDDXrU-dMkQ5K1KttnAA3aAcJma4DJyPwJ_Sum2wzxfGMoeSa-2gSYIREtvuqyI1vFWB0sl16di_9x6VZqeCvhrcCytg3oo9MmlKvaIdgFHJf',
    description: 'Refreshing blend of fresh strawberries, mint, lime, and sparkling soda.',
    tag: 'Veg'
  },
  { 
    id: 'd2', 
    categoryId: '6', 
    name: 'Iced Caramel Macchiato', 
    price: 950.00, 
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=400&fit=crop',
    description: 'Premium espresso with chilled milk and a sweet caramel drizzle over ice.',
    tag: 'Veg'
  },
  
  // Desserts (Category 4)
  { 
    id: 'de1', 
    categoryId: '4', 
    name: 'New York Cheesecake', 
    price: 1350.00, 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZJ8AXRFLVwirfrF4taPld4IS6iVc4WCOueAn4B4ppF0-UCpQzhSPm5xQlBxT_fApuC00ladwQmti8djfujRczzgzl8B5fo2QZocW_o_Mso2daQ5FM8TEg2xB0jI6McSn_PC6VqHd9igzBMRiFAbKqhaC61AyJJB_ijdA8mKG0S6JxR8a0sGIGAHrxqdS9up9qY9R_YhCM6-QcYzogvEolH03SHNSjAEonTrqjig_60BwKaWPBQC1zaTri4aDBdz4yuX6bP3HuxLrk',
    description: 'Rich and creamy classic cheesecake with a graham cracker crust and berry coulis.',
    tag: 'Veg'
  },
  { 
    id: 'de2', 
    categoryId: '4', 
    name: 'Chocolate Lava Cake', 
    price: 1250.00, 
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream.',
    tag: 'Veg'
  },
];

export type Order = {
  id: string;
  orderNumber: string;
  status: 'Preparing' | 'Delivered' | 'Cancelled';
  date: string;
  time: string;
  price: number;
  image: string;
  items: string[];
};

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'FE-9402',
    status: 'Preparing',
    date: 'Today',
    time: '12:45 PM',
    price: 4500.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoCsCW-tuk-VhaX9Pnl1z6Sw8yMTZQNp2aZd5Izclz_0me8R3oAFO90m_qO1n79x57ZxHJW-ecvfm5xg6TnOlnDgSAV0wTY5gDy0v0KsjVJ2ODkgntPpQ6-GYXnEquOwvGL7YuJS3gxc5z8DuaJ9zP5Mtrfxrpds2ipLg5fZigP6YbkEmessiaWORj5lWY0WJk2OgD92l0jrH3QPudBJ14LPuFZfSvRCLoSDVEmzam1COhTf1Jl42n-TIm2ZPNlm_QplljnM3FqXIN',
    items: ['Double Cheeseburger', 'French Fries']
  },
  {
    id: '2',
    orderNumber: 'FE-8291',
    status: 'Delivered',
    date: 'Oct 24, 2023',
    time: '7:20 PM',
    price: 3850.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2V-GVpQocltLVS6HXdddYnh_IoaeQRyr_GGcAOUG6aH22N2G-xlUdj9ks1ePM4GxMfyKT-KbIoFRknLNYiSMhv2p3h-9B6wuSC78d5krRQS2CJn6MesMrFc8DwccSUvvfKLKARH-cD_iHdhiR9smmSNut187homQJFUlg3gXy7_w1a-_XGW0sji5VRPe-mDyRblzNpksm47ld3zU1iFCZ7p7Q0gcuA4ohFMLHnm6pwQPdm-rvR6mznFcjO6oIeOuuwV_UADV11DHS',
    items: ['Pepperoni Pizza']
  },
  {
    id: '3',
    orderNumber: 'FE-7742',
    status: 'Delivered',
    date: 'Oct 18, 2023',
    time: '1:15 PM',
    price: 2450.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLJXEr_bIuLnJxRXTNifAhI8W89ABOH-gN2vUdkgXbAF4hnXUQGnxTZbBSm1DIpPq5CWcFfoM3ft0ww8_7PuyA7jrZnGDGK_GhPZXKIvCt70pGJb97o9q6dLYC5iAndBmrcjSdC0U8eMEyLex_Vy3jyQBnMeHSrL3x5yaDii5zdO8TWRUkQqlvKwaTZYtwwf2xk1nc3NY3zDV8HdhJkk9MWUU0yAKie_-O_NakFgU60bCrlaBFtxtOyHGX2BxCFm1XP0EyjYNGOnzl',
    items: ['Greek Salad', 'Iced Tea']
  },
  {
    id: '4',
    orderNumber: 'FE-6912',
    status: 'Delivered',
    date: 'Oct 12, 2023',
    time: '8:45 PM',
    price: 8500.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKk8bhz_WdWkvxq4_V976kbuICweeTz6nsZJ8Pq2BS40yWctIpNZkudpUnNc5s8Iq-H6FDcnDAIMV5gC1nya9qUS6A6Jf80N-a2ZKJ8IB10ddTzMyJz9EXfzLldgY4IzF1vYziaJzdGwaX0sEXx-wWTwPG-dp8_lKhKq2SdqIZ7jkj4KiVWKRmeBQeZluwCy6KrU86557356Hh_29pzOjoWb_BXfOeb8V61dlGfzBO1P8RVlA1vof_4T4zckZiLoLzn97zXCX8A73J',
    items: ['Sushi Platter']
  }
];
