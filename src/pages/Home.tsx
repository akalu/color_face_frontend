// src/pages/Home.tsx
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonText,
  IonSpinner
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ skin_tone: string; season: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const goToQuiz = () => {
    history.push({
      pathname: '/quiz',
      state: {
        skin_tone: result?.skin_tone || null,
        season: result?.season || null
      }
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null); // reset result
    }
  };

  const handleUpload = async () => {
    console.log("Uploading file:", selectedFile);
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://color-face-backend.up.railway.app/analizar', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    
      const data = await response.json();
      setResult({ skin_tone: data.skin_tone, season: data.season });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skin Tone Analyzer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Upload a face image:</IonLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </IonItem>

        <IonButton expand="block" onClick={handleUpload} disabled={!selectedFile || loading}>
          {loading ? <IonSpinner name="dots" /> : 'Analyze'}
        </IonButton>
        <IonButton expand="block" color="secondary" onClick={goToQuiz}>
          Take Style Quiz
        </IonButton>

        {result && (
          <IonText color="primary">
            <h2 className="ion-padding">Subtone: {result.skin_tone}</h2>
            <h2 className="ion-padding">Season: {result.season}</h2>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
