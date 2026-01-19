import { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Tabs,
  Tab
} from "react-bootstrap";

export default function ProductForm({ formData, setFormData, onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState("produto");

  const handle = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = (e) => {
    setFormData({ ...formData, unidade_medida: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, imagem: file });

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, imagem: "" });
    setImagePreview(null);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        justify
      >

        {/* ================== DADOS DO PRODUTO ================== */}
        <Tab eventKey="produto" title="📦 Dados do Produto">
          <Row className="g-4 mt-3">

            {/* COLUNA ESQUERDA - FORMULÁRIO */}
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handle}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handle}
                  rows={4}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Unidade de Medida</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.unidade_medida}
                      onChange={handleSelect}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Estoque Inicial</Form.Label>
                    <Form.Control
                      type="number"
                      name="estoque"
                      value={formData.estoque}
                      onChange={handle}
                      min="0"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Preço (R$)</Form.Label>
                <Form.Control
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handle}
                  step="0.01"
                  min="0"
                  required
                />
              </Form.Group>
            </Col>

            {/* COLUNA DIREITA - IMAGEM (IDÊNTICA AO ORIGINAL) */}
            <Col md={4}>
              <Form.Group>
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
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>
                      <small className="d-block mt-2">
                        PNG, JPG ou WEBP
                      </small>
                    </div>
                  ) : (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-100 h-100"
                        style={{
                          objectFit: "fill",
                          borderRadius: "8px",
                        }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 m-3"
                        onClick={removeImage}
                      >
                        ×
                      </Button>
                    </>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Tab>

        {/* ================== DADOS FISCAIS ================== */}
        <Tab eventKey="fiscal" title="🧾 Dados Fiscais">
          <Row className="g-4 mt-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>NCM</Form.Label>
                <Form.Control type="text" name="ncm" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CFOP</Form.Label>
                <Form.Control type="text" name="cfop" />
              </Form.Group>
            </Col>
          </Row>
        </Tab>

      </Tabs>

      <div className="text-end mt-3">
        <Button type="submit" variant="primary">
          Salvar Produto
        </Button>
      </div>
    </Form>
  );
}
