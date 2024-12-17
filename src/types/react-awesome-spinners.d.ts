declare module 'react-awesome-spinners' {
    import React from 'react';
  
    interface SpinnerProps {
      size?: number;
      color?: string;
      sizeUnit?: string;
    }
  
    export class Ring extends React.Component<SpinnerProps> {}
    export class Circle extends React.Component<SpinnerProps> {}
    export class Bar extends React.Component<SpinnerProps> {}
    // เพิ่มสปินเนอร์อื่น ๆ ตามที่จำเป็น
  }
  