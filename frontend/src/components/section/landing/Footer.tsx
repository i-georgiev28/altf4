import { Github, Twitter } from "lucide-react"
import { Footer as FooterComponent } from "@/components/ui/footer"
import Logo from "@/assets/Logo";

function Footer() {
  return (
    <div className="w-full">
      <FooterComponent
        logo={<Logo />}
        brandName=""
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2025 SolarEye",
          license: "All rights reserved",
        }}
      />
    </div>
  )
}

export { Footer };