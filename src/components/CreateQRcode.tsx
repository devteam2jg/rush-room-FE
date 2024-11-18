import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

function CreateQRcode() {
  const nav = useNavigate();

  return (
    <section className="w-full h-[50vh] flex items-center justify-center flex-col">
      <h1>QR CODE</h1>
      <QRCodeCanvas
        className="border-4 border-primary rounded-xl"
        size={200}
        onClick={() => nav('/newhome')}
        value="URL주소"
        bgColor="#161717"
        fgColor="#B9A5E2"
      />
    </section>
  );
}

export default CreateQRcode;
