import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { CalendarIcon, PersonIcon } from '../svg'

export default function ContestArtCard({ artwork, onClick }) {
    // handle click
    const handleClick = () => {
        onClick(artwork)
    }

    return (
        <div className="transition-all duration-200 hover:-translate-y-2">
            <div className="relative h-[370px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl [border-bottom-width:12px] hover:shadow-gray-300">
                <Image
                    className="h-[236px] w-[300px] border-b-4 border-black object-cover hover:cursor-pointer"
                    src={
                        artwork.Thumbnails?.[0].url
                            ? artwork.Thumbnails?.[0].url
                            : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                    }
                    alt={artwork.Thumbnails?.[0].name}
                    width={300}
                    height={236}
                    onClick={handleClick}
                />

                <div className="mt-4 px-5 py-1 ">
                    <div className="flex flex-row gap-2">
                        <PersonIcon />
                        <p className="h-6 overflow-hidden break-all text-sm">
                            @{artwork['Artist']}
                        </p>
                    </div>
                    <p className="flex flex-row gap-2 text-sm">
                        <CalendarIcon />
                        {formatDate(artwork['Dates'])}
                    </p>
                </div>

                <div className="flex flex-row gap-2 px-4 py-2">
                    {artwork.Categories?.map((category) => (
                        <div
                            key={category}
                            className="flex flex-row items-center justify-center rounded-full border-2 border-black bg-transparent px-2 py-1 text-sm font-medium text-gray-900 hover:bg-[#FFBD12]"
                        >
                            {category}
                        </div>
                    ))}
                </div>

                {artwork['Storage Link'] && (
                    <a
                        href={artwork['Storage Link']}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="absolute bottom-[14px] right-12">
                            <div className="rounded-full border-2 border-black bg-[#FBF9F5] px-1.5 font-bold hover:bg-[#FFBD12]">{`DL`}</div>
                        </div>
                    </a>
                )}

                {artwork['Twitter Post Link'] && (
                    <a
                        href={artwork['Twitter Post Link']}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="absolute bottom-[14px] right-4">
                            <div className="rounded-full border-2 border-black bg-[#FBF9F5] px-1.5 font-bold hover:bg-[#FFBD12]">{`>`}</div>
                        </div>
                    </a>
                )}

                {artwork['CC0'] && artwork['CC0'] === 'Yes' && (
                    <div className="absolute bottom-16 right-3">
                        <div className="rounded-full border-2 border-black bg-[#00C6AE] px-1 py-2 text-[10px] font-extrabold ">{`CC0`}</div>
                    </div>
                )}

                {artwork.No && (
                    // STAR SVG
                    <div className="absolute top-2 left-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="56.378"
                            height="54"
                            viewBox="0 0 56.378 54"
                        >
                            <g
                                id="_rating-star_filled"
                                data-name="_rating-star / filled"
                                transform="translate(2.003 2)"
                            >
                                <path
                                    id="Star"
                                    d="M28.283,43.106l-14,8.087a1.954,1.954,0,0,1-2.888-2.1l3.366-15.811L2.747,22.47a1.954,1.954,0,0,1,1.1-3.4L19.927,17.39,26.5,2.62a1.954,1.954,0,0,1,3.57,0l6.571,14.77,16.077,1.685a1.954,1.954,0,0,1,1.1,3.4L41.8,33.283l3.366,15.811a1.954,1.954,0,0,1-2.888,2.1Z"
                                    transform="translate(-2.097 -1.46)"
                                    fill="#ffbd12"
                                />
                                <g
                                    id="outline"
                                    transform="translate(-2.097 -1.46)"
                                    fill="none"
                                    stroke-miterlimit="10"
                                >
                                    <path
                                        d="M28.283,43.106l-14,8.087a1.954,1.954,0,0,1-2.888-2.1l3.366-15.811L2.747,22.47a1.954,1.954,0,0,1,1.1-3.4L19.927,17.39,26.5,2.62a1.954,1.954,0,0,1,3.57,0l6.571,14.77,16.077,1.685a1.954,1.954,0,0,1,1.1,3.4L41.8,33.283l3.366,15.811a1.954,1.954,0,0,1-2.888,2.1Z"
                                        stroke="none"
                                    />
                                    <path
                                        d="M 43.25639724731445 51.46022796630859 C 44.41767120361328 51.46022796630859 45.44398498535156 50.38896560668945 45.16840362548828 49.09435272216797 L 41.80276870727539 33.28321075439453 L 53.81918334960938 22.4699878692627 C 55.07709884643555 21.3380241394043 54.39898300170898 19.2509880065918 52.71594619750977 19.07458877563477 L 36.63861846923828 17.38958930969238 L 30.06792259216309 2.61983585357666 C 29.38007354736328 1.073681116104126 27.18562698364258 1.073684930801392 26.49779319763184 2.61983585357666 L 19.92708778381348 17.38958930969238 L 3.849758148193359 19.07458877563477 C 2.166722774505615 19.2509880065918 1.488605141639709 21.3380241394043 2.746522665023804 22.4699878692627 L 14.76293468475342 33.28321075439453 L 11.39729881286621 49.09435272216797 C 11.04498100280762 50.74951934814453 12.82032585144043 52.03937911987305 14.28559303283691 51.19282531738281 L 28.28285217285156 43.10599899291992 L 42.28010940551758 51.19282531738281 C 42.59930038452148 51.37723159790039 42.9329833984375 51.46022796630859 43.25639724731445 51.46022796630859 M 43.25639343261719 53.46022415161133 C 42.56968688964844 53.46022415161133 41.88612365722656 53.27500152587891 41.27959442138672 52.92457580566406 L 28.28285217285156 45.41579055786133 L 15.28609943389893 52.92457580566406 C 14.67960548400879 53.27497863769531 13.99606418609619 53.46020126342773 13.30938148498535 53.46022415161133 C 12.12885189056396 53.46025848388672 10.97622871398926 52.90710830688477 10.22611141204834 51.98054122924805 C 9.477357864379883 51.05567169189453 9.191240310668945 49.8519287109375 9.441123008728027 48.6779670715332 L 12.56618690490723 33.99697494506836 L 1.40869927406311 23.9566707611084 C 0.2310521751642227 22.89694213867188 -0.1963948905467987 21.30263519287109 0.2931698262691498 19.79593086242676 C 0.7827227711677551 18.28921318054199 2.065652132034302 17.25062370300293 3.641275644302368 17.08548355102539 L 18.56942939758301 15.52092456817627 L 24.67046356201172 1.806906461715698 C 25.31440544128418 0.3594241142272949 26.69859313964844 -0.5397759079933167 28.28285217285156 -0.5397759079933167 C 29.86712265014648 -0.5397759079933167 31.25131034851074 0.3594241142272949 31.8952522277832 1.806906461715698 L 37.99627685546875 15.52092456817627 L 52.92441558837891 17.08548355102539 C 54.50005340576172 17.25062370300293 55.78298187255859 18.28921318054199 56.27253341674805 19.79593086242676 C 56.76210021972656 21.30263519287109 56.33465194702148 22.89694213867188 55.15700531005859 23.9566707611084 L 43.99951934814453 33.99697494506836 L 47.12458038330078 48.67795181274414 C 47.37445068359375 49.85182571411133 47.08834457397461 51.0555305480957 46.33961868286133 51.98041152954102 C 45.5894889831543 52.90702438354492 44.43687438964844 53.46022415161133 43.25639343261719 53.46022415161133 Z"
                                        stroke="none"
                                        fill="#18191f"
                                    />
                                </g>
                            </g>
                        </svg>
                        <span className="text-md absolute left-[23px] top-4 font-gibson font-bold">
                            {artwork.No}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
