import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer>
      <Separator className="my-2" />
      <div className="flex justify-end items-center p-4 limit-width text-muted-foreground mb-2 text-sm">
        <div className="flex justify-center items-center gap-4">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Terms
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center p-2 limit-width text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Tushar Gaurav. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
