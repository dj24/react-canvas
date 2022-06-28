import { HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";
import objectStore from "./objectStore";
import getFiberId from "../util/getFiberId";
import { SpringValue } from "react-spring";

const hostConfig: HostConfig<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
> = {
  /* configuration for how to talk to the host environment */
  /* aka "host config" */

  supportsMutation: true,

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    let animatedProps = { ...props };
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === "number") {
        animatedProps[key] = new SpringValue({
          config: { friction: 40, tension: 400, mass: 2 },
          to: value,
        });
      }
    });
    const id = getFiberId(internalInstanceHandle);
    return { id, props: animatedProps };
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return document.createTextNode(text);
  },

  appendChildToContainer(container, child) {
    console.log("appendChildToContainer", child.props.scale);
    objectStore[child.id] = child.props;
    // container.appendChild(child);
  },
  appendChild(parent, child) {
    console.log("appendChild", { parent, child });
    objectStore[child.id] = child.props;
    console.log(Object.values(objectStore).length);
    // parent.appendChild(child);
  },
  appendInitialChild(parent, child) {
    console.log("appendInitialChild", { parent, child });
    // parent.appendChild(id);
  },

  removeChildFromContainer(container, child) {
    console.log("removeChildFromContainer", { container, child });
    delete objectStore[child.id];
    console.log(Object.values(objectStore).length);
    // container.removeChild(child);
  },
  removeChild(parent, child) {
    console.log("removeChild", { parent, child });
    delete objectStore[child.id];
    console.log(Object.values(objectStore).length);
    // parent.removeChild(child);
  },
  insertInContainerBefore(container, child, before) {
    console.log("insertInContainerBefore", { container, child, before });
    // container.insertBefore(child, before);
  },
  insertBefore(parent, child, before) {
    console.log("insertBefore", { parent, child, before });
    // parent.insertBefore(child, before);
  },

  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) {
    Object.entries(newProps).forEach(([key, value]) => {
      const instanceHasProp = instance.props.hasOwnProperty(key);
      const instanceContainsSpring = instance.props[key] instanceof SpringValue;
      /*
      If updating an animated value with a number, update the spring
       */
      if (
        instanceHasProp &&
        instanceContainsSpring &&
        typeof value === "number"
      ) {
        instance.props[key].start({
          from: instance.props[key].get(),
          to: newProps[key],
        });
      } else {
        objectStore[instance.id] = {
          ...objectStore[instance.id],
          [key]: value,
        };
      }
    });
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    console.log("commitUpdate", { instance });
  },

  shouldSetTextContent() {
    return false;
  },
  finalizeInitialChildren: () => false,
  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  getRootHostContext: () => {},
  getChildHostContext: () => {},
  appendChildToContainerChildSet: () => {},
  canHydrateInstance: () => {},
  canHydrateSuspenseInstance: () => {},
  canHydrateTextInstance: () => {},
  cancelTimeout: () => {},
  clearContainer: () => {},
  cloneHiddenInstance: () => {},
  cloneHiddenTextInstance: () => {},
  cloneInstance: () => {},
  commitHydratedContainer: () => {},
  commitHydratedSuspenseInstance(suspenseInstance: any): void {},
  commitMount: () => {},
  commitTextUpdate: () => {},
  createContainerChildSet: () => {},
  detachDeletedInstance(node: any): void {},
  didNotFindHydratableContainerInstance: () => {},
  didNotFindHydratableContainerSuspenseInstance: () => {},
  didNotFindHydratableContainerTextInstance: () => {},
  didNotFindHydratableInstance: () => {},
  didNotFindHydratableSuspenseInstance: () => {},
  didNotFindHydratableTextInstance: () => {},
  didNotHydrateContainerInstance: () => {},
  didNotHydrateInstance: () => {},
  didNotMatchHydratedContainerTextInstance: () => {},
  didNotMatchHydratedTextInstance: () => {},
  errorHydratingContainer: () => {},
  finalizeContainerChildren: (...args) =>
    console.log("finalizeContainerChildren", { args }),
  getFirstHydratableChild: () => {},
  getInstanceFromScope: () => {},
  getNextHydratableInstanceAfterSuspenseInstance: () => {},
  getNextHydratableSibling: () => {},
  getParentSuspenseInstance: () => {},
  getPublicInstance: () => {},
  hideInstance: () => {},
  hideTextInstance: () => {},
  hydrateInstance: () => null,
  hydrateSuspenseInstance: () => {},
  hydrateTextInstance: () => false,
  isPrimaryRenderer: true,
  isSuspenseInstanceFallback: () => false,
  isSuspenseInstancePending: () => false,
  noTimeout: undefined,
  preparePortalMount: () => {},
  registerSuspenseInstanceRetry: () => {},
  replaceContainerChildren: () => {},
  resetTextContent: () => {},
  scheduleTimeout: () => {},
  supportsHydration: false,
  supportsPersistence: false,
  unhideInstance: () => {},
  unhideTextInstance: () => {},
  afterActiveInstanceBlur: () => {},
  beforeActiveInstanceBlur: () => {},
  getCurrentEventPriority: () => DefaultEventPriority,
  getInstanceFromNode: () => null,
  prepareScopeUpdate: () => {},
};

export default hostConfig;
