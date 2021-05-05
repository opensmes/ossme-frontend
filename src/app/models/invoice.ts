export class Invoice {
  id!: string;
  item!: string;
  date!: Date;
  due!: Date;
  qty!: number;
  tax!: number;
  rate!: number;
}
