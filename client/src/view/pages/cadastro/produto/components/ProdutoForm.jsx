// produtos/components/ProdutoForm.jsx
import { useState } from "react";
import { Button, Form, Row, Col, Image } from "react-bootstrap";

export default function ProdutoForm({ formData, setFormData, onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handle = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = (e) => {
    setFormData({ ...formData, unidade_medida: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagem: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imagem: "" });
    setImagePreview(null);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row className="g-4">
        {/* COLUNA ESQUERDA - FORMULÁRIO */}
        <Col md={8}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handle}
              placeholder="Ex: Notebook Dell Inspiron"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              name="descricao"
              value={formData.descricao}
              onChange={handle}
              rows={4}
              placeholder="Descreva as características do produto..."
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formMeasuringUnit" className="mb-3">
                <Form.Label>Unidade de Medida</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.unidade_medida}
                  onChange={handleSelect}
                  aria-label="Unidade de Medida"
                >
                  <option value="UN">Unidade</option>
                  <option value="L">Litro</option>
                  <option value="M">Metro</option>
                  <option value="KG">Quilograma</option>
                  <option value="CX">Caixa</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formStock" className="mb-3">
                <Form.Label>Estoque Inicial</Form.Label>
                <Form.Control
                  type="number"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handle}
                  min="0"
                  placeholder="0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Preço (R$)</Form.Label>
            <Form.Control
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handle}
              min="0"
              step="0.01"
              placeholder="0,00"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Salvar Produto
          </Button>
        </Col>

        {/* COLUNA DIREITA - IMAGEM */}
        <Col md={4}>
          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Imagem do Produto</Form.Label>
            <div
              className="d-flex justify-content-center align-items-center position-relative"
              style={{
                border: "2px dashed #ccc",
                padding: "1px",
                borderRadius: "8px",
                height: "350px",
                width: "100%",
                maxWidth: "500px",
                overflow: "hidden",
              }}
            >
              {!imagePreview ? (
                <div className="text-center">
                  <label
                    htmlFor="image-upload"
                    className="btn btn-outline-primary w-100"
                  >
                    Selecione uma Imagem
                    <input
                      id="image-upload"
                      type="file"
                      name="imagem"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                  <small className="d-block mt-2">PNG, JPG ou WEBP</small>
                </div>
              ) : (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-100 h-100"
                    style={{
                      objectFit: "fill", // preenche o container e corta o excesso
                      borderRadius: "8px",
                      display: "block",
                    }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={removeImage}
                    className="position-absolute top-0 end-0 m-3" // Fixando o botão no canto superior direito
                  >
                    ×
                  </Button>
                </>
              )}
            </div>


          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
