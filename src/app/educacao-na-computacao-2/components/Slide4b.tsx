import Image from 'next/image';

export default function Slide4b() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col items-start mb-10">
                <h3>
                    Contagem de Cartas
                </h3>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row gap-8 items-start justify-center">
                    <article className="flex flex-row gap-4 items-start flex-1 pr-8 border-r border-gray-300">
                        <figure className="flex-shrink-0">
                            <a
                                href="https://drive.google.com/file/d/1aDa8SPbw9WhAtJ2q0a32POQXuAIDilwn/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/img-01-cover.png"
                                    alt="A Favorable Strategy for Twenty-One by Edward Thorp"
                                    width={300}
                                    height={390}
                                />
                            </a>
                        </figure>
                        <div className="flex flex-col items-start">
                            <p className="text-[0.60em]">
                                <strong>A Favorable Strategy for Twenty-One</strong>
                            </p>
                            <ul className="flex flex-col text-[0.66em] list-none">
                                <li><strong>Autor:</strong> Edward Thorp (1961)</li>
                                <li><strong>Revista:</strong> PNAS</li>
                                <li><strong>Referência:</strong> Vol. 47, No. 1, pp. 110-112</li>
                                <li><strong>DOI:</strong> 10.1073/pnas.47.1.110</li>
                                <li>
                                    <strong>Link:</strong>{' '}
                                    <a
                                        href="https://drive.google.com/file/d/1aDa8SPbw9WhAtJ2q0a32POQXuAIDilwn/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        drive.google.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </article>

                    <article className="flex flex-row gap-4 items-start flex-1 pl-8">
                        <figure className="flex-shrink-0">
                            <a
                                href="https://drive.google.com/file/d/1qDfbnwQFV2zLpMAqyY0NilPej4OewYa4/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/img-00-cover.png"
                                    alt="Mathematics of Big Four"
                                    width={300}
                                    height={390}
                                />
                            </a>
                        </figure>
                        <div className="flex flex-col items-start">
                            <p className="text-[0.60em]">
                                <strong>Mathematics of The Big Four Casino Table Games</strong>
                            </p>
                            <ul className="flex flex-col text-[0.66em] list-none">
                                <li><strong>Autor:</strong> Mark Bollman (2021)</li>
                                <li><strong>Revista:</strong> Technometrics</li>
                                <li><strong>Referência:</strong> Vol. 65, No. 4, 2023</li>
                                <li><strong>Publisher:</strong> Taylor &amp; Francis</li>
                                <li>
                                    <strong>Link:</strong>{' '}
                                    <a
                                        href="https://drive.google.com/file/d/1qDfbnwQFV2zLpMAqyY0NilPej4OewYa4/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        drive.google.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
