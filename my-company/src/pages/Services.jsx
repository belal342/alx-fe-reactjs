function Services() {
  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      marginBottom: '4rem'
    }}>
      <h1 style={{ color: 'navy' }}>Our Services</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {[
          "Technology Consulting",
          "Market Analysis",
          "Product Development",
          "Digital Marketing",
          "Cloud Solutions"
        ].map((service, index) => (
          <li key={index} style={{
            backgroundColor: '#f0f0f0',
            margin: '0.5rem 0',
            padding: '1rem',
            borderRadius: '5px'
          }}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Services