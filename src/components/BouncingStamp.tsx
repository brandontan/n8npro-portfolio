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
      className="absolute z-30 cursor-pointer select-none"
      style={{
        top: '20%',
        right: '15%',
        transform: 'rotate(-15deg)'
      }}
      onClick={scrollToContact}
    >
      <div className="relative">
        {/* Rubber stamp design matching original styling */}
        <div className="rubber-stamp-enhanced">
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