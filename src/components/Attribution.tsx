const Attribution = () => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <span style={{fontSize: '12px'}}>Select image from</span>
    <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
      <img
        src="https://images.pexels.com/lib/api/pexels.png"
        height={16}
        style={{marginLeft: '8px'}}
        alt="Pexels"
      />
    </a>
  </div>
)

export default Attribution
