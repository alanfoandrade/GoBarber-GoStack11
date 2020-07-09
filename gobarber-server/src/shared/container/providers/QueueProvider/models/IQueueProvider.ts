export default interface IQueueProvider {
  add(queue: string, job: any): Promise<void>;
  process(): Promise<void>;
}
