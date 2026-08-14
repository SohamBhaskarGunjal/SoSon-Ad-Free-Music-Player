const Section = ({ title, subtitle, children }) => (
  <section className="section-block">
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
    {children}
  </section>
)

export default Section
