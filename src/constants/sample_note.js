export const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "This is my awesome editor!",
                "level": 1
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "You can type some text here...",
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "You can <mark class='cdx-marker'>mark your text</mark>.",
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text":
                    'Format your note with customize color:<font style="color: rgb(139, 195, 74);"> <b>green text</b></font>, <font style="color: rgb(0, 112, 255);"><b>blue text</b></font>, etc.',
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Press 'TAB' for command...",
            }
        },
    ],
    "version": "2.27.0",
}