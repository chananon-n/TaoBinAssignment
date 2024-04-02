class MachineSaleEvent implements IEvent {
    constructor(private readonly _sold: number, private readonly _machineId: string) {}
  
    machineId(): string {
      return this._machineId;
    }
  
    getSoldQuantity(): number {
      return this._sold
    }
  
    type(): string {
      return 'sale';
    }
  }
  
  class MachineRefillEvent implements IEvent {
    constructor(private readonly _refill: number, private readonly _machineId: string) {}
  
    machineId(): string {
      throw new Error("Method not implemented.");
    }
  
    type(): string {
      throw new Error("Method not implemented.");
    }
  }

  class MachineSaleSubscriber implements ISubscriber {
    public machines: Machine[];
  
    constructor (machines: Machine[]) {
      this.machines = machines; 
    }
  
    handle(event: MachineSaleEvent): void {
      this.machines[2].stockLevel -= event.getSoldQuantity();
    }
  }
  
  class MachineRefillSubscriber implements ISubscriber {
    handle(event: IEvent): void {
      throw new Error("Method not implemented.");
    }
  }

  class PublishSubscriber implements IPublishSubscribeService {

      private subscribers: Map<string, ISubscriber[]> = new Map(); 
      
      publish(event: IEvent): void {
        // get event type
        const type = event.type();
        const subscribers = this.subscribers.get(type);
        
        if(subscribers) {
          subscribers.forEach(subscriber => subscriber.handle(event));
        }
          
      }
      subscribe(type: string, handler: ISubscriber): void {
         // if not subscribed
        if(!this.subscribers.has(type)) {
        this.subscribers.set(type, []);
        }

        // add subscriber
        this.subscribers.get(type)?.push(handler);
      }

      unsubscribe(type: string, handler: ISubscriber): void {
        const subscribers = this.subscribers.get(type);
        //find the handler and remove it
        if(subscribers) {
          const index = subscribers.indexOf(handler);
          if(index !== -1) {
            subscribers.splice(index, 1);
          }
        }
      }
      
}

  // helpers
const randomMachine = (): string => {
    const random = Math.random() * 3;
    if (random < 1) {
      return '001';
    } else if (random < 2) {
      return '002';
    }
    return '003';
  
  }
  
  const eventGenerator = (): IEvent => {
    const random = Math.random();
    if (random < 0.5) {
      const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
      return new MachineSaleEvent(saleQty, randomMachine());
    } 
    const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
    return new MachineRefillEvent(refillQty, randomMachine());
  }
