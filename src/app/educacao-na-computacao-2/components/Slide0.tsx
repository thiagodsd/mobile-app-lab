export default function Slide0() {
    return (
        <section className="flex flex-col gap-8 items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <iframe
                    width="1280"
                    height="720"
                    src="https://www.youtube.com/embed/MlCYBrLOP3A?end=107"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </section>
    );
}
