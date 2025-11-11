export default function Slide4() {
  return (
    <section className="flex flex-col gap-4">
      <h2>O que está acontecendo aqui?</h2>

      <iframe
        width="960"
        height="540"
        src="https://www.youtube.com/embed/MlCYBrLOP3A"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </section>
  );
}
