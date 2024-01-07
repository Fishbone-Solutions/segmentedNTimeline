import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var segmentedNtimeline6841085FFCE149249A025B2BB08E3721_DEBUG: IVisualPlugin = {
    name: 'segmentedNtimeline6841085FFCE149249A025B2BB08E3721_DEBUG',
    displayName: 'segmentedNtimeline',
    class: 'Visual',
    apiVersion: '5.3.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["segmentedNtimeline6841085FFCE149249A025B2BB08E3721_DEBUG"] = segmentedNtimeline6841085FFCE149249A025B2BB08E3721_DEBUG;
}
export default segmentedNtimeline6841085FFCE149249A025B2BB08E3721_DEBUG;