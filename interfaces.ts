
// interfaces
interface IEvent {
    type(): string;
    machineId(): string;
  }
  
interface ISubscriber {
    handle(event: IEvent): void;
  }
  
  interface IPublishSubscribeService {
    publish (event: IEvent): void;
    subscribe (type: string, handler: ISubscriber): void;
    unsubscribe ( type: string, handler: ISubscriber): void;
  }
  