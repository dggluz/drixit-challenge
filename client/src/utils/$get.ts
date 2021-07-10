export const $getBySelector = ($wrapper: JQuery<HTMLElement>) => (selector: string) => {
    const $ret = $wrapper.find(selector);

    if ($ret.length !== 1) {
        throw new Error(`Couldn't find element matching the selector "${selector}"`);
    }

    return $ret;
};
