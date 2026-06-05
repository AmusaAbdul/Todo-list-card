"use client"

export default function Footer() {

    const year = new Date().getFullYear();

    return(
        <div className="text-center mt-20">
            <p className="text-[0.9rem]">
              © {year} Developed by{" "}
              <a 
                href="https://wa.me/23408156345656" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                Abdullah
              </a>
            </p>
        </div>
    )
}