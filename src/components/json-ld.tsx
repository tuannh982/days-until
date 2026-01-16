import Script from "next/script";

export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Days Until",
        url: "https://tuannh982.github.io/days-until/",
        description:
            "Track how many days are left until your vacation, birthday, or any important date with this beautiful countdown timer.",
        applicationCategory: "UtilityApplication",
        genre: "productivity",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        author: {
            "@type": "Person",
            name: "tuannh982",
            url: "https://github.com/tuannh982",
        },
    };

    return (
        <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
