import Image from "next/image"
import { TrendingDown } from "lucide-react";
import { Bell, Rabbit, Shield } from "lucide-react";

import AuthButton from "@/components/AuthButton";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";

import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Speed of Light",
      description:
        "Deal Drop parses prices instantly, mastering even the most complex dynamic sites.",
    },
    {
      icon: Shield,
      title: "Unwavering Reliability",
      description:
        "Engineered for all major retailers with advanced anti-bot resilience built-in.",
    },
    {
      icon: Bell,
      title: "Precision Alerts",
      description: "Receive immediate intelligence when targets hit your price point.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/price-drop-logo.png"
              alt="Deal Drop Logo"
              width={1400}
              height={600}
              className="h-14 w-auto object-contain"
            />
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-primary">
            Command the Market. <br className="hidden md:block" />
            <span className="text-foreground">Capture the Value.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The definitive tool for the strategic shopper. Zero latency. Maximum savings.
            Elevate your purchasing power with real-time data.
          </p>

          <AddProductForm user={user} />

          {/* Features */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto my-20">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {user && products.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 pb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Your Watchlist
                </h3>
                <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full border border-border">
                  {products.length} {products.length === 1 ? "Asset" : "Assets"}
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* No Products Yet */}
          {user && products.length === 0 && (
            <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
              <div className="bg-card rounded-xl border-2 border-dashed border-border p-12 hover:border-primary/50 transition-colors">
                <TrendingDown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No assets tracked
                </h3>
                <p className="text-muted-foreground">
                  Initialize tracking by adding your first product URL above.
                </p>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
