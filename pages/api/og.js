import { ImageResponse } from '@vercel/og'

export const config = {
    runtime: 'experimental-edge',
}

export default function () {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FBF9F5',
                }}
            >
                <svg
                    width="1200"
                    height="600"
                    viewBox="0 0 1200 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_26_36)">
                        <path d="M1200 0H0V600H1200V0Z" fill="#FBF9F5" />
                        <path
                            d="M529.81 305.11V322.3H514.43V275.76H529.41L541.44 292.78V275.76H556.78V322.3H542.41L541.94 322.57L529.81 305.11Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M602.88 316.73C597.94 321.62 592.08 324.07 585.29 324.07C578.5 324.07 572.66 321.62 567.7 316.73C562.83 311.79 560.4 305.93 560.4 299.14C560.4 292.35 562.83 286.42 567.7 281.55C572.61 276.64 578.48 274.18 585.29 274.18C592.1 274.18 597.99 276.64 602.88 281.55C607.82 286.37 610.28 292.24 610.28 299.14C610.28 306.04 607.81 311.84 602.88 316.73ZM591.99 292.41C590.14 290.56 587.9 289.63 585.29 289.63C582.68 289.63 580.38 290.56 578.52 292.41C576.69 294.26 575.77 296.51 575.77 299.14C575.77 301.77 576.69 304.01 578.52 305.91C580.42 307.74 582.67 308.66 585.29 308.66C587.91 308.66 590.14 307.74 591.99 305.91C593.91 304.06 594.87 301.8 594.87 299.14C594.87 296.48 593.91 294.19 591.99 292.41Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M638.13 275.83H653.54V303.97C653.54 309.58 651.57 314.31 647.64 318.18C643.69 322.16 638.93 324.14 633.37 324.14C627.81 324.14 623.21 322.15 619.16 318.18C615.25 314.32 613.3 309.58 613.3 303.97V275.83H628.68V303.97C628.68 305.27 629.14 306.37 630.05 307.29C630.97 308.21 632.07 308.66 633.37 308.66C634.67 308.66 635.84 308.2 636.75 307.29C637.66 306.38 638.12 305.27 638.12 303.97V275.83H638.13Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M673.24 305.11V322.3H657.86V275.76H672.84L684.87 292.78V275.76H700.21V322.3H685.84L685.37 322.57L673.24 305.11Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M721.28 291.67C721.73 291.78 723.45 291.95 726.44 292.17L727.81 292.3C732.08 292.75 735.45 294.4 737.93 297.26C740.16 299.94 741.2 303.02 741.05 306.51C740.6 312.25 738.72 316.65 735.39 319.71C732.78 322.03 728.01 323.48 721.08 324.07C714.65 324.23 709.18 322.99 704.66 320.35L709.38 305.41C713.11 307.73 716.62 308.84 719.9 308.73C720.68 308.73 721.34 308.71 721.88 308.66C722.84 308.62 723.42 308.57 723.62 308.53C724.62 308.37 725.17 307.89 725.26 307.09C725.37 306.2 724.96 305.57 724.02 305.21C723.55 305.1 722.96 305.02 722.24 304.98H721.2C718.41 304.85 716.35 304.67 715.03 304.44C711.68 304.02 709.04 302.39 707.12 299.55C705.42 297.07 704.64 294.36 704.77 291.41C705.13 285.63 706.99 281.24 710.36 278.24C713.46 275.4 717.66 273.95 722.96 273.88C728.25 273.7 734.18 274.65 740.75 276.73L736.09 292.04C733.03 290.34 730.06 289.28 727.18 288.86C725.13 288.66 723.79 288.57 723.16 288.59C722.15 288.63 721.52 288.68 721.25 288.72C720.65 288.85 720.28 289.21 720.14 289.79C720.03 290.46 720.18 290.97 720.61 291.33C720.77 291.46 720.98 291.58 721.25 291.66L721.28 291.67Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M779.28 316.6L777.54 322.3H761.19L776.63 275.83H793.45L808.96 322.3H792.54L790.83 316.6H779.27H779.28ZM787.09 304.17L785.08 297.5L783.04 304.17H787.09Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M846.08 309.77L855.46 322.3H836.23L829.86 313.82H827.68V322.3H812.3V275.76H833.94C839.55 275.76 844.21 277.65 847.94 281.42C851.83 285.26 853.77 289.48 853.77 294.08C853.77 299.55 851.83 304.22 847.94 308.08C847.34 308.68 846.71 309.24 846.06 309.75L846.08 309.77ZM827.69 298.75H833.96C835.25 298.75 836.34 298.28 837.21 297.34C838.13 296.47 838.58 295.39 838.58 294.09C838.58 292.79 838.12 291.68 837.21 290.81C836.34 289.94 835.26 289.5 833.96 289.5H827.69V298.75Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M890.97 305.61L900.18 317.54L899.01 318.71C894.7 322.28 889.35 324.07 882.96 324.07C876.1 324.07 870.24 321.62 865.37 316.73C860.5 311.88 858.07 306.02 858.07 299.14C858.07 292.26 860.5 286.35 865.37 281.48C870.24 276.61 876.1 274.18 882.96 274.18C888.23 274.18 893.37 275.94 898.37 279.47L889.93 292.7C887.76 290.65 885.44 289.62 882.96 289.62C880.26 289.62 878 290.55 876.19 292.4C874.31 294.25 873.38 296.5 873.38 299.13C873.38 301.97 874.18 304.17 875.79 305.73C877.49 307.45 879.88 308.31 882.96 308.31C886.44 308.31 889.11 307.41 890.97 305.6V305.61Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M927.96 322.3V306.65H918.65V322.3H903.2V275.76H918.65V291.27H927.96V275.76H943.37V322.3H927.96Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M947.73 322.3V275.76H963.11V322.3H947.73Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M999.09 322.3H982.27L966.83 275.83H983.18L990.72 300.59L998.19 275.83H1014.61L999.1 322.3H999.09Z"
                            fill="#1A1A1A"
                        />
                        <path
                            d="M1051.76 289.43H1033.17V292.38H1045.6V305.04H1033.17V308.22H1051.83V322.29H1017.79V275.75H1051.76V289.42V289.43Z"
                            fill="#1A1A1A"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M171.5 185.07H401.36V198.86H415.15V221.85H424.34V414.93H171.5V185.07Z"
                            fill="black"
                        />
                        <path
                            d="M364.62 185.07H208.57V253.61H364.62V185.07Z"
                            fill="#424242"
                        />
                        <path
                            d="M355.13 194.56H327.72V245.17H355.13V194.56Z"
                            fill="#000100"
                        />
                        <path
                            d="M263.39 194.56H235.98V208.27H263.39V194.56Z"
                            fill="#000100"
                        />
                        <path
                            d="M231.24 195.09H222.8V207.74H231.24V195.09Z"
                            stroke="#9B9C9C"
                        />
                        <path
                            d="M194.86 221.98H185.37V231.47H194.86V221.98Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M401.52 221.98H392.03V231.47H401.52V221.98Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M194.86 391.73H185.37V401.22H194.86V391.73Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M415.23 391.73H401.52V414.93H415.23V391.73Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M424.72 410.71H171.67V414.93H424.72V410.71Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M175.89 185.07H171.67V414.93H175.89V185.07Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M415.23 198.78H411.01V221.98H415.23V198.78Z"
                            fill="#3E3E3F"
                        />
                        <path
                            d="M428.94 221.98H424.72V414.93H428.94V221.98Z"
                            fill="#878787"
                        />
                        <path
                            d="M304.52 267.31H231.77V341.12H304.52V267.31Z"
                            fill="#EC1D24"
                        />
                        <path
                            d="M318.22 290.51H194.86V304.22H318.22V290.51Z"
                            fill="#EC1D24"
                        />
                        <path
                            d="M208.57 290.51H194.86V327.41H208.57V290.51Z"
                            fill="#EC1D24"
                        />
                        <path
                            d="M392.04 267.31H318.23V341.12H392.04V267.31Z"
                            fill="#EC1D24"
                        />
                        <path
                            d="M267.61 276.8H240.2V332.68H267.61V276.8Z"
                            fill="#FEFEFE"
                        />
                        <path
                            d="M355.13 276.8H327.72V332.68H355.13V276.8Z"
                            fill="#FEFEFE"
                        />
                        <path
                            d="M296.09 276.8H267.62V332.68H296.09V276.8Z"
                            fill="black"
                        />
                        <path
                            d="M382.54 276.8H355.13V332.68H382.54V276.8Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_26_36">
                            <rect width="1200" height="600" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    )
}
