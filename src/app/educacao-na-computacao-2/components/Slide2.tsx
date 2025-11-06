export default function Slide2() {
  return (
    <section>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '2em'
      }}>
        <h2 style={{
          fontFamily: 'Latin Modern Roman, Computer Modern, serif',
          fontSize: '2em',
          marginBottom: '1.5em',
          color: '#333'
        }}>
          Vamos jogar!
        </h2>
        <a
          href="/simple-blackjack"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'Latin Modern Roman, Computer Modern, serif',
            fontSize: '1.5em',
            padding: '0.8em 2em',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Jogar Blackjack
        </a>
      </div>
    </section>
  );
}
