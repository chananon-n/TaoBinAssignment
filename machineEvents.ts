// abstract class
class MachineEvent implements IEvent {
    constructor(private readonly id: string) {}

    machineId(): string {
      return this.id;
    }

    type(): string {
        return "";
    }
  }

  class MachineSaleEvent extends MachineEvent {
    constructor(private readonly _sold: number, private readonly _machineId: string) {
        super(_machineId);
    }
  
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

  class MachineRefillEvent extends MachineEvent {
    constructor(private readonly _refill: number, private readonly _machineId: string) {
        super(_machineId);
    }
  
    machineId(): string {
      return this._machineId;
    }
  
    type(): string {
      return 'refill';
    }
  }

  export { MachineSaleEvent, MachineRefillEvent };




