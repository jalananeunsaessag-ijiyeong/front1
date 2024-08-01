class RecorderProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.buffer = [];
      this.recording = false;
  
      this.port.onmessage = (event) => {
        if (event.data.command === 'stop') {
          this.recording = false;
          this.port.postMessage(this.buffer);
        } else if (event.data.command === 'start') {
          this.recording = true;
        }
      };
    }
  
    process(inputs) {
      if (!this.recording) return true;
  
      const input = inputs[0];
      if (input.length > 0) {
        this.buffer.push(new Float32Array(input[0]));
      }
  
      return true;
    }
  }
  
  registerProcessor('recorder-processor', RecorderProcessor);
  
