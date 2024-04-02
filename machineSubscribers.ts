import { Machine } from "./machine";
import { MachineSaleEvent } from "./machineEvents";

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