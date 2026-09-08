import { useState, useEffect, useRef } from "react";
import portfolio_data from "../data/portfolio_data.json";
import { FadeIn } from "./component";

// ── Types ──────────────────────────────────────────────────────────────────
interface Project {
	id: string;
	number: string;
	year: string;
	name: string;
	category: string;
	desc: string;
	tags: string[];
	image: string;
}

interface Experience {
	period: string;
	company: string;
	details: {
		role: string;
		desc: string;
	}[];
	skills: string[];
}

interface Education {
	date: string[];
	degree: string;
	school: string;
	desc: string;
}

// ── Components ──────────────────────────────────────────────────────────────
function ProjectBanner({
	project,
	index,
}: {
	project: Project;
	index: number;
}) {
	return (
		<FadeIn delay={index * 60}>
			<div className="project-banner">
				<img
					className="banner-img"
					src={project.image}
					alt={project.name}
					loading="lazy"
				/>
				<div className="banner-overlay" />
				<div className="banner-content">
					<div className="banner-meta">
						<span className="banner-number">{project.number}</span>
						<span className="banner-category">
							{project.category}
						</span>
						<span className="banner-year">{project.year}</span>
					</div>
					<h3 className="banner-name">{project.name}</h3>
					<p className="banner-desc">{project.desc}</p>
					<div className="banner-tags">
						{project.tags.map((t) => (
							<span key={t} className="banner-tag">
								{t}
							</span>
						))}
					</div>
				</div>
				<div className="banner-arrow">↗</div>
			</div>
		</FadeIn>
	);
}

function ExperienceRow({ exp, delay }: { exp: Experience; delay: number }) {
	return (
		<FadeIn delay={delay}>
			<div className="exp-item">
				<div>
					<div className="exp-period">{exp.period}</div>
					<div className="exp-company">{exp.company}</div>
				</div>
				<div className="exp-detail">
					{exp.details.map((d, i) => {
						return (
							<div key={i}>
								<div className="exp-role">{d.role}</div>
								<p className="exp-desc">{d.desc}</p>
							</div>
						);
					})}
					<div className="exp-skills">
						{exp.skills.map((s) => (
							<span key={s} className="exp-skill">
								{s}
							</span>
						))}
					</div>
				</div>
			</div>
		</FadeIn>
	);
}

function EducationRow({ edu, delay }: { edu: Education; delay: number }) {
	return (
		<FadeIn delay={delay}>
			<div className="edu-item">
				<p className="about-edu-school">{edu.school}</p>

				<p className="about-edu-date">
					{new Date(edu.date[0]).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long", // Options: 'long' (January), 'short' (Jan), or '2-digit' (01)
					})}{" "}
					-{" "}
					{new Date(edu.date[1]).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long", // Options: 'long' (January), 'short' (Jan), or '2-digit' (01)
					})}
				</p>

				<p className="about-edu-detail">{edu.degree}</p>
				<p
					className="about-edu-detail"
					style={{ marginTop: "0.85rem" }}
				>
					{edu.desc}
				</p>
			</div>
		</FadeIn>
	);
}

function MyNav() {
	return (
		<nav className="nav">
			<div className="nav-inner">
				<a href="#" className="nav-logo">
					Fiona Wang
				</a>
				<ul className="nav-links">
					<li>
						<a href="#experience">Experience</a>
					</li>
					<li>
						<a href="#projects">Projects</a>
					</li>
					<li>
						<a href="#about">About</a>
					</li>
					<li>
						<a href="mailto:alex@example.com" className="nav-cta">
							Get in touch
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

function MyFooter() {
	return (
		<>
			<hr className="divider" />
			<div
				style={{
					width: "100%",
					background:
						"linear-gradient(120deg, #372744 20%, #89340f 100%)",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<div className="position-relative">
					<div
						style={{
							backgroundColor: "#610000",
							opacity: "30%",
							width: "500px",
							height: "500px",
							borderRadius: "50%",
							position: "absolute",
							right: "160px",
							top: "-200px",
						}}
					></div>
					<div
						style={{
							backgroundColor: "#BD8524",
							opacity: "15%",
							width: "400px",
							height: "400px",
							borderRadius: "50%",
							position: "absolute",
							right: "-50px",
							top: "50px",
						}}
					></div>
				</div>
				<div className="footer-inner">
					<div className="footer-left">
						<div className="footer-name">Fiona Wang</div>
						<div className="footer-sub">
							Frontend Developer · Washington DC
						</div>
					</div>
					<div className="footer-links">
						<a href="https://github.com/YunqinWang" target="_blank">
							GitHub
						</a>
						<a
							href="https://www.linkedin.com/in/fiona-yunqin-wang-4343971a4/"
							target="_blank"
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
	return (
		<>
			<MyNav />

			{/* HERO */}
			<section className="hero">
				<div
					className="hero-left"
					style={{ animation: "fadeUp 0.7s 0.05s both" }}
				>
					<div className="hero-eyebrow">
						<div className="hero-eyebrow-dot" />
						Available for work
					</div>
					<h1 className="hero-title">
						Frontend developer
						<br />
						<em>building things</em>
						<br />
						that matter.
					</h1>
				</div>
				<div className="hero-right">
					<p className="hero-desc">
						Hi, I'm Alex — a frontend developer based in San
						Francisco with 5+ years of experience turning complex
						problems into clean, performant interfaces. I care about
						code quality, accessibility, and the details that make
						products feel delightful.
					</p>
					<div className="hero-stats">
						<div>
							<span className="stat-num">5+</span>
							<span className="stat-label">Years experience</span>
						</div>
						<div>
							<span className="stat-num">20+</span>
							<span className="stat-label">Projects shipped</span>
						</div>
						<div>
							<span className="stat-num">3</span>
							<span className="stat-label">Companies</span>
						</div>
					</div>
					<div className="hero-actions">
						<a href="#projects" className="btn-primary">
							View my work
						</a>
						<a
							href="mailto:alex@example.com"
							className="btn-outline"
						>
							Say hello
						</a>
					</div>
				</div>
			</section>

			<hr className="divider" />

			{/* EXPERIENCE */}
			<div className="exp-bg" id="experience">
				<div className="section">
					<div className="section-header">
						<div>
							<p className="section-eyebrow">Career</p>
							<h2 className="section-title">Experience</h2>
						</div>
					</div>
					<div className="exp-list">
						{portfolio_data.EXPERIENCES.map((e, i) => (
							<ExperienceRow
								key={e.company}
								exp={e}
								delay={i * 80}
							/>
						))}
					</div>
				</div>
			</div>

			{/* PROJECTS */}
			<div className="section" id="projects">
				<div className="section-header">
					<div>
						<p className="section-eyebrow">Selected work</p>
						<h2 className="section-title">Projects</h2>
					</div>
					<span className="section-count">
						{portfolio_data.PROJECTS.length} projects
					</span>
				</div>
				<div className="projects-list">
					{portfolio_data.PROJECTS.map((p, i) => (
						<ProjectBanner key={p.id} project={p} index={i} />
					))}
				</div>
			</div>

			{/* ABOUT */}
			<div className="section" id="about">
				<div className="about-grid">
					<FadeIn>
						<div className="section-header">
							<div>
								<p className="section-eyebrow">Background</p>
								<h2 className="section-title">About me</h2>
							</div>
						</div>
						<blockquote className="about-quote">
							"I believe good software makes complex systems
							easier to understand and work with."
						</blockquote>
					</FadeIn>
					<FadeIn delay={100}>
						<p className="about-body">
							I'm drawn to the intersection of computer science,
							engineering, and the built environment. My work in
							the traffic engineering industry has given me
							experience building web applications, GIS tools, and
							data-driven systems that connect technology with the
							physical world.
						</p>
						<p className="about-body">
							I'm particularly interested in software development
							and building thoughtful, reliable tools that make
							complex systems easier to understand and use. With a
							background in architecture and computer science, I
							enjoy using software and data to solve complex,
							real-world engineering problems.
						</p>
					</FadeIn>
				</div>
				<div className="about-grid about-edu">
					<div>
						<p className="about-edu-label">Education</p>
						{portfolio_data.EDUCATIONS.map((e, i) => (
							<EducationRow
								key={e.school}
								edu={e}
								delay={i * 80}
							/>
						))}
					</div>

					<div>
						<p className="skills-label">Core skills</p>
						<div className="skills-grid">
							{portfolio_data.SKILLS.map((s) => (
								<div key={s} className="skill-item">
									{s}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<MyFooter />
		</>
	);
}
