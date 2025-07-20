import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you, ${formData.name}! We'll contact you soon.`)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      marginBottom: '4rem'
    }}>
      <h1 style={{ color: 'navy' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', minHeight: '150px' }}
        />
        <button type="submit" style={{
          backgroundColor: 'navy',
          color: 'white',
          padding: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact