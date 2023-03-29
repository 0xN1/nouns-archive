import { TwitterIcon } from './svg'

export default function Footer() {
    return (
        <footer className="mt-4 flex flex-col items-center justify-center py-8 text-center">
            {/* <p className="text-sm font-medium text-gray-600">
                ©2023 Nouns Archive
            </p> */}
            <a
                href="https://twitter.com/nounsarchive"
                target="_blank"
                rel="noopener noreferrer"
            >
                <TwitterIcon className="my-4" />
            </a>
            <p className="text-sm font-medium text-gray-600">
                Nouns Archive (NounsDAO Prop 176)
            </p>

            <p className="text-xs text-gray-500">
                We love CC0. Every item serves mostly as a reference.
            </p>
            <p className="text-xs text-gray-500">
                You can refer to the respective artist/builder for their consent
                to use / create derivatives by referring to them.
            </p>
        </footer>
    )
}
