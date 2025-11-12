export default function Slide4() {
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col items-center mb-10">
        <h3>
          O que está acontecendo aqui?
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center">
        <iframe
          width="960"
          height="540"
          src="https://www.youtube.com/embed/MlCYBrLOP3A"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
