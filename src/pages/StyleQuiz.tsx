// src/pages/StyleQuiz.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonItem, IonLabel, IonRadioGroup,
  IonRadio, IonList, IonText
} from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';

const StyleQuiz: React.FC = () => {
  const location = useLocation<{ skin_tone?: string; season?: string }>();
  const history = useHistory();
  const skinTone = location.state?.skin_tone || null;
  const season = location.state?.season || null;

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch('https://color-face-backend.up.railway.app/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: Object.entries(answers).map(([q, a]) => a + q),
        skin_tone: skinTone,
        season: season
      })
    });
    const data = await response.json();
    setResult(data);
    setSubmitted(true);
  };

  const handleBack = () => {
    history.push('/home');
  };

  const questions = [
    '1. ¿Prefieres comodidad o elegancia en tu ropa?',
    '2. ¿Qué tipo de colores prefieres usar?',
    '3. ¿Qué tipo de estampados prefieres?',
    '4. ¿Qué tipo de calzado prefieres?',
    '5. ¿Qué accesorio sueles usar más?',
    '6. ¿Cómo prefieres que te perciban los demás?',
    '7. ¿Cuál es tu ambiente favorito para relajarte?',
    '8. ¿Qué música escuchas generalmente?',
    '9. ¿Qué tipo de prendas te gustan más?',
    '10. ¿Qué redes sociales usas más?',
    '11. ¿Te gusta experimentar con tu look?'
  ];

  const options = [
    ['A) Comodidad (Streetwear, Athleisure)', 'B) Elegancia (Old Money, Dark Academia)', 'C) Equilibrio (Minimalista, Boho)'],
    ['A) Neutros y discretos (Minimalista, Old Money)', 'B) Vivos y llamativos (E-boy/E-girl, Grunge)', 'C) Tonos terrosos y naturales (Boho, Cottagecore)'],
    ['A) Ropa lisa (Minimalista, Old Money)', 'B) Florales o naturales (Boho, Cottagecore)', 'C) Gráficos o llamativos (E-boy/E-girl, Streetwear)'],
    ['A) Zapatillas deportivas (Athleisure, Streetwear)', 'B) Botas o mocasines (Old Money, Dark Academia)', 'C) Sandalias o calzado ligero (Boho, Cottagecore)'],
    ['A) Cadenas llamativas (E-boy/E-girl, Grunge)', 'B) Bufandas o pañuelos (Dark Academia, Old Money)', 'C) Gorras o sombreros (Streetwear, Cottagecore)'],
    ['A) Sofisticado y elegante (Old Money, Dark Academia)', 'B) Relajado y natural (Boho, Cottagecore)', 'C) Moderno y urbano (Streetwear, Athleisure)'],
    ['A) Cafeterías o bibliotecas (Dark Academia, Old Money)', 'B) Al aire libre o campo (Cottagecore, Boho)', 'C) Eventos deportivos o urbanos (Athleisure, Streetwear)'],
    ['A) Indie o Folk (Cottagecore, Boho)', 'B) Rock o Punk (Grunge, E-boy/E-girl)', 'C) Jazz o Clásica (Old Money, Dark Academia)'],
    ['A) Holgadas y cómodas (Athleisure, Streetwear)', 'B) Entalladas y elegantes (Old Money, Minimalista)', 'C) Detalles llamativos (Grunge, E-boy/E-girl)'],
    ['A) Instagram y TikTok (E-boy/E-girl, Streetwear)', 'B) Pinterest y Tumblr (Cottagecore, Dark Academia)', 'C) LinkedIn y Twitter (Old Money, Minimalista)'],
    ['A) Sí, cambio constantemente (E-boy/E-girl, Grunge)', 'B) A veces con estilo propio (Minimalista, Boho)', 'C) Clásico y definido (Old Money, Dark Academia, Vintage)']
  ];

  const colorPalettes = [
    // ya están Cool Winter y Cool Summer
    {
        title: 'Cool Winter',
        palettes: [
          [
            { name: 'Púrpura Profundo', hex: '#483983' },
            { name: 'Rojo Ciruela', hex: '#87345B' },
            { name: 'Azul Pizarra', hex: '#1A4C50' },
            { name: 'Gris Carbón', hex: '#333438' },
            { name: 'Gris Azulado Claro', hex: '#CBCCD5' },
            { name: 'Verde Esmeralda', hex: '#429B8D' },
            { name: 'Azul Cielo', hex: '#41A6D2' },
            { name: 'Rosa Frambuesa', hex: '#D86AA0' },
            { name: 'Lavanda Intenso', hex: '#936DA7' }
          ],
          [
            { name: 'Azul Pizarra', hex: '#1A4C50' },
            { name: 'Azul Acero', hex: '#1E6387' },
            { name: 'Rosa Vino', hex: '#A24175' },
            { name: 'Azul Nocturno', hex: '#232731' },
            { name: 'Gris Azulado Medio', hex: '#979AA2' },
            { name: 'Verde Esmeralda', hex: '#429B8D' },
            { name: 'Púrpura Suave', hex: '#6F4785' },
            { name: 'Rosa Pastel', hex: '#F1A6CB' },
            { name: 'Azul Cielo', hex: '#41A6D2' }
          ],
          [
            { name: 'Azul Cielo Brillante', hex: '#6DC1FC' },
            { name: 'Azul Rey', hex: '#3E70D3' },
            { name: 'Celeste Helado', hex: '#C3F0FE' },
            { name: 'Blanco Puro', hex: '#FFFFFF' },
            { name: 'Negro Suave', hex: '#232731' },
            { name: 'Amarillo Brillante', hex: '#FFF44F' },
            { name: 'Rosa Pastel', hex: '#F1A6CB' },
            { name: 'Rosa Intenso', hex: '#B73376' },
            { name: 'Rojo Frambuesa', hex: '#A52950' }
          ]
        ]
      },
      {
        title: 'Cool Summer',
        palettes: [
          [
            { name: 'Azul Bebé', hex: '#86BAF6' },
            { name: 'Lavanda Pastel', hex: '#8995D3' },
            { name: 'Rosa Suave', hex: '#EEBDD2' },
            { name: 'Gris Perla', hex: '#E6E2E1' },
            { name: 'Gris Azulado', hex: '#A3ABBF' },
            { name: 'Frambuesa', hex: '#BC486A' },
            { name: 'Coral Suave', hex: '#EA728C' },
            { name: 'Azul Denim', hex: '#5B97CB' },
            { name: 'Azul Profundo', hex: '#497AB9' }
          ],
          [
            { name: 'Azul Marino', hex: '#2A3F75' },
            { name: 'Azul Bebé', hex: '#86BAF6' },
            { name: 'Azul Aguamarina', hex: '#1E7599' },
            { name: 'Gris Carbón', hex: '#3B3F42' },
            { name: 'Gris Azulado', hex: '#A3ABBf' },
            { name: 'Rojo Intenso', hex: '#902F38' },
            { name: 'Azul Profundo', hex: '#497AB9' },
            { name: 'Celeste Suave', hex: '#5EB2D1' },
            { name: 'Azul Denim', hex: '#5B97CB' }
          ],
          [
            { name: 'Verde Salvia', hex: '#36817A' },
            { name: 'Azul Lavanda', hex: '#5A64A6' },
            { name: 'Fucsia Suave', hex: '#D95F8B' },
            { name: 'Gris Claro', hex: '#A1B3C6' },
            { name: 'Gris Rosado', hex: '#D6CBCa' },
            { name: 'Lavanda', hex: '#7C83BD' },
            { name: 'Azul Denim', hex: '#5B97CB' },
            { name: 'Verde Pasto', hex: '#49A784' },
            { name: 'Frambuesa', hex: '#BC486A' }
          ]
        ]
      },
    // Aquí añadiremos las siguientes paletas
    {
      title: 'Warm Autumn',
      palettes: [
        [
          { name: 'Verde Bosque', hex: '#306A4D' },
          { name: 'Azul Profundo', hex: '#175C78' },
          { name: 'Burdeos', hex: '#74232E' },
          { name: 'Beige Dorado', hex: '#E2C692' },
          { name: 'Gris Topo', hex: '#A3A191' },
          { name: 'Mandarina Quemada', hex: '#E1593E' },
          { name: 'Rojo Óxido', hex: '#A73340' },
          { name: 'Verde Oliva Oscuro', hex: '#476A30' },
          { name: 'Vino Suave', hex: '#864D75' }
        ],
        [
          { name: 'Azul Petróleo', hex: '#1D4759' },
          { name: 'Amarillo Dorado', hex: '#F3BB5F' },
          { name: 'Rojo Tierra', hex: '#C43B32' },
          { name: 'Marfil Cálido', hex: '#F8EBD4' },
          { name: 'Marrón Profundo', hex: '#623C39' },
          { name: 'Turquesa Terroso', hex: '#54AFBE' },
          { name: 'Verde Oliva Oscuro', hex: '#476A30' },
          { name: 'Naranja Tostado', hex: '#DD7A3D' },
          { name: 'Coral Intenso', hex: '#EA6B6A' }
        ],
        [
          { name: 'Verde Mostaza', hex: '#8B8C5C' },
          { name: 'Marrón Cálido', hex: '#915439' },
          { name: 'Rojo Teja', hex: '#DC5F4C' },
          { name: 'Gris Pardo', hex: '#96938A' },
          { name: 'Marrón Tierra', hex: '#69574B' },
          { name: 'Naranja Tostado', hex: '#DD7A3D' },
          { name: 'Melón Dorado', hex: '#F6B26A' },
          { name: 'Mandarina Quemada', hex: '#E1593E' },
          { name: 'Rojo Óxido', hex: '#A73340' }
        ]
      ]
    },
    {
      title: 'Warm Spring',
      palettes: [
        [
          { name: 'Amarillo Maíz', hex: '#E6C05B' },
          { name: 'Rojo Coral', hex: '#DE4437' },
          { name: 'Melón Suave', hex: '#ED9779' },
          { name: 'Marrón Miel', hex: '#9F6947' },
          { name: 'Marrón Cálido', hex: '#765041' },
          { name: 'Amarillo Pastel', hex: '#FAE086' },
          { name: 'Naranja Melocotón', hex: '#F18654' },
          { name: 'Rosa Coral', hex: '#EF7171' },
          { name: 'Rojo Vibrante', hex: '#EC4E46' }
        ],
        [
          { name: 'Rojo Vibrante', hex: '#EC4E46' },
          { name: 'Amarillo Dorado', hex: '#E7C870' },
          { name: 'Verde Jade', hex: '#378278' },
          { name: 'Azul Marino Suave', hex: '#254C71' },
          { name: 'Crema Suave', hex: '#FAE5D8' },
          { name: 'Verde Pasto', hex: '#64BFA6' },
          { name: 'Naranja Melocotón', hex: '#F18654' },
          { name: 'Rosa Coral', hex: '#EF7171' },
          { name: 'Azul Cielo', hex: '#5085C3' }
        ],
        [
          { name: 'Melón Suave', hex: '#ED9779' },
          { name: 'Amarillo Dorado', hex: '#E7C870' },
          { name: 'Verde Jade', hex: '#378278' },
          { name: 'Azul Marino Suave', hex: '#254C71' },
          { name: 'Marrón Suave', hex: '#8E6750' },
          { name: 'Verde Pasto', hex: '#64BFA6' },
          { name: 'Naranja Melocotón', hex: '#F18654' },
          { name: 'Rosa Coral', hex: '#EF7171' },
          { name: 'Azul Cielo', hex: '#5085C3' }
        ]
      ]
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Style Quiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" routerLink="/home" color="medium">
          Volver a inicio
        </IonButton>

        {!submitted ? (
          <IonList>
            {questions.map((question, idx) => (
              <React.Fragment key={idx}>
                <IonItem>
                  <IonLabel>{question}</IonLabel>
                </IonItem>
                <IonRadioGroup value={answers[idx + 1]} onIonChange={e => handleAnswerChange(idx + 1, e.detail.value)}>
                  <IonItem><IonLabel>{options[idx][0]}</IonLabel><IonRadio slot="start" value="A" /></IonItem>
                  <IonItem><IonLabel>{options[idx][1]}</IonLabel><IonRadio slot="start" value="B" /></IonItem>
                  <IonItem><IonLabel>{options[idx][2]}</IonLabel><IonRadio slot="start" value="C" /></IonItem>
                </IonRadioGroup>
              </React.Fragment>
            ))}

            <IonButton expand="block" onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length}>
              Enviar respuestas
            </IonButton>
          </IonList>
        ) : (
          <IonText className="ion-padding">
            <h3>Subtono detectado: {result?.skin_tone || skinTone || 'No disponible'}</h3>
            <h3>Estación: {result?.season || season || 'No disponible'}</h3>
            <h3>Ranking de estilos:</h3>
            <ol>
              {result?.ranking?.length > 0 ? (
                result.ranking.map((item: any, idx: number) => (
                  <li key={idx}>{item[0]} — {item[1]} puntos</li>
                ))
              ) : (
                <li>No hay resultados disponibles.</li>
              )}
            </ol>

            <h3>Paletas de colores sugeridas:</h3>
            {colorPalettes.map((group, gIdx) => (
              <div key={gIdx} style={{ marginBottom: '1.5rem' }}>
                <h4>{group.title}</h4>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {group.palettes.map((palette, pIdx) => (
                    <div key={pIdx}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: 120 }}>
                        {palette.map((color, cIdx) => (
                          <div
                            key={cIdx}
                            title={color.name}
                            style={{ backgroundColor: color.hex, width: 30, height: 30, borderRadius: 4 }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <IonButton expand="block" color="primary" onClick={handleBack}>Volver a inicio</IonButton>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default StyleQuiz;
