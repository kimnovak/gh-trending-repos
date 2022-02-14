import React from 'react';

interface Props {
    contexts: React.ReactElement[];
}

export default function ProviderComposer({
    contexts,
    children,
}: React.PropsWithChildren<Props>) {
    return (
        <>
            {contexts.reduceRight(
                (children, parent) =>
                    parent
                        ? React.cloneElement(parent, { children })
                        : children,
                children
            )}
        </>
    );
}
