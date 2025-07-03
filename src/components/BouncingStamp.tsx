'use client'

export default function BouncingStamp() {

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed top-24 right-4 z-50 cursor-pointer select-none"
      style={{
        transform: 'rotate(-12deg)'
      }}
      onClick={scrollToContact}
    >
      <div className="relative">
        {/* Rubber stamp design matching original styling */}
        <div className="rubber-stamp">
          <div className="stamp-text">
            FREE
            <br />
            MVP!
          </div>
        </div>
      </div>
    </div>
  )
}