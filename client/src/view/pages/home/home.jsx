import React from "react";
import { Container, Row, Col, Card, Navbar, Nav } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Home() {
  // Dados de exemplo para gráficos
  const barData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [120, 150, 180, 90, 200, 170],
        backgroundColor: "#007bff",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Pedidos",
        data: [30, 45, 28, 50, 42, 60],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Pagos", "Pendentes", "Atrasados"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#17a2b8", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar fictícia de 100px */}

      {/* Conteúdo principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Atlas Gestão Integrada</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#" style={{ color: "white" }}>Dashboard</Nav.Link>
            <Nav.Link href="#" style={{ color: "white" }}>Relatórios</Nav.Link>
            <Nav.Link href="#" style={{ color: "white" }}>Configurações</Nav.Link>
          </Nav>
        </Navbar>

        {/* Dashboard */}
        <main style={{ padding: "20px", backgroundColor: "#f8f9fa", flex: 1 }}>
          <Container fluid>
            <Row className="mb-4">
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Vendas Mensais</Card.Title>
                    <Bar data={barData} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Pedidos</Card.Title>
                    <Line data={lineData} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Status de Pagamentos</Card.Title>
                    <Pie data={pieData} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Cards de resumo */}
            <Row>
              <Col md={3}>
                <Card bg="primary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Clientes</Card.Title>
                    <Card.Text>124</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card bg="success" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Pedidos</Card.Title>
                    <Card.Text>87</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card bg="warning" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Faturas</Card.Title>
                    <Card.Text>53</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card bg="danger" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Suporte</Card.Title>
                    <Card.Text>12</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}
