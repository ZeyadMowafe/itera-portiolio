import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { useAnimationReady } from "../context/AnimationContext";
import "./Hero.css";

/* ─── Scramble ──────────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function useScramble(target, ready, delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !ready) return;
    const el = ref.current;
    let frame = 0,
      raf,
      tick = 0;
    const run = () => {
      raf = requestAnimationFrame(run);
      if (++tick < delay * 60) return;
      const p = Math.min(frame / 32, 1);
      const ri = Math.floor(p * target.length);
      el.textContent = target
        .split("")
        .map((c, i) =>
          c === " "
            ? " "
            : i < ri
              ? c
              : CHARS[Math.floor(Math.random() * CHARS.length)],
        )
        .join("");
      if (++frame > 32) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, ready]);
  return ref;
}

/* ─── Counter ───────────────────────────────────────────────────── */
function Counter({ to, suffix, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = { v: 0 };
    const t = setTimeout(
      () =>
        gsap.to(s, {
          v: parseFloat(to),
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.floor(s.v) + suffix;
          },
        }),
      delay,
    );
    return () => clearTimeout(t);
  }, [to, suffix, delay]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Icon SVG paths (exact from react-icons) ──────────────────── */
const ICONS = [
  {
    name: "React",
    vb: "0 0 24 24",
    d: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  },
  {
    name: "Django",
    vb: "0 0 24 24",
    d: "M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z",
  },
  {
    name: "Python",
    vb: "0 0 24 24",
    d: "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z",
  },
  {
    name: "Docker",
    vb: "0 0 24 24",
    d: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  {
    name: "PostgreSQL",
    vb: "0 0 24 24",
    d: "M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698z",
  },
  {
    name: "Redis",
    vb: "0 0 24 24",
    d: "M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z",
  },
  {
    name: "Git",
    vb: "0 0 24 24",
    d: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187",
  },
  {
    name: "GitHub",
    vb: "0 0 24 24",
    d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "Bootstrap",
    vb: "0 0 24 24",
    d: "M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z",
  },
  {
    name: "HTML5",
    vb: "0 0 24 24",
    d: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z",
  },
  {
    name: "CSS3",
    vb: "0 0 24 24",
    d: "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z",
  },
  {
    name: "JavaScript",
    vb: "0 0 24 24",
    d: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
  },
];

/* ─── Palette — 4 purple tones matching the site ─────────────────── */
// Light: rgba(124,58,237, 0.7-1.0)  Mid: rgba(167,139,250)  Faint: rgba(196,181,253)
const PALETTE = [
  { fill: "rgba(124,58,237,1)", glow: "rgba(124,58,237,0.18)", opacity: 1.0 },
  { fill: "rgba(139,92,246,0.9)", glow: "rgba(139,92,246,0.14)", opacity: 0.9 },
  {
    fill: "rgba(167,139,250,0.8)",
    glow: "rgba(167,139,250,0.1)",
    opacity: 0.78,
  },
  {
    fill: "rgba(196,181,253,0.7)",
    glow: "rgba(196,181,253,0.08)",
    opacity: 0.6,
  },
];

/* ─── Build canvas texture ──────────────────────────────────────── */
function makeTexture(icon, size = 192) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");

  // Pick a palette shade pseudo-randomly based on icon index
  const pi = ICONS.indexOf(icon) % PALETTE.length;
  const pal = PALETTE[pi];

  // Subtle glow bg
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size * 0.46,
  );
  g.addColorStop(0, pal.glow);
  g.addColorStop(0.7, "rgba(124,58,237,0.04)");
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.46, 0, Math.PI * 2);
  ctx.fill();

  // Parse viewBox
  const [, , vw, vh] = icon.vb.split(" ").map(Number);
  const pad = size * 0.16;
  const scale = (size - pad * 2) / Math.max(vw, vh);
  const ox = pad + (size - pad * 2 - vw * scale) / 2;
  const oy = pad + (size - pad * 2 - vh * scale) / 2;

  // Draw SVG path in purple
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);
  ctx.fillStyle = pal.fill;
  ctx.fill(new Path2D(icon.d));
  ctx.restore();

  // Thin ring
  ctx.strokeStyle = "rgba(124,58,237,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(c);
}

export default function Hero() {
  const { ready } = useAnimationReady();
  const canvasRef = useRef(null);
  const headline = useRef(null);
  const subtext = useRef(null);
  const buttons = useRef(null);
  const badge = useRef(null);
  const stats = useRef(null);
  const section = useRef(null);
  const cursor = useRef(null);
  const cursorDot = useRef(null);

  const line1 = useScramble("We Build", ready, 0.4);
  const line2 = useScramble("Powerful", ready, 0.7);

  /* Initial hide */
  useEffect(() => {
    gsap.set(badge.current, { opacity: 0.01, y: 20 });
    gsap.set(headline.current?.querySelectorAll(".hero-line") || [], {
      opacity: 0.01,
      y: 40,
    });
    gsap.set(subtext.current, { opacity: 0.01, y: 22 });
    gsap.set(buttons.current?.children || [], {
      opacity: 0.01,
      scale: 0.85,
      y: 14,
    });
    gsap.set(stats.current?.children || [], { opacity: 0.01, y: 22 });
  }, []);

  /* ── Three.js ─────────────────────────────────────────────────── */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const renderer = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      cv.offsetWidth / cv.offsetHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6.5);

    /* Sprites */
    const sprites = [];
    const meta = [];
    ICONS.forEach((icon, i) => {
      const tex = makeTexture(icon);
      const pi = i % PALETTE.length;
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const sp = new THREE.Sprite(mat);

      // Distribute: right 55% of view, varying depth
      const angle = (i / ICONS.length) * Math.PI * 1.85 - 0.6;
      const r = 1.9 + (i % 3) * 0.85;
      const x = r * Math.cos(angle) * 1.15 + 0.3;
      const y = r * Math.sin(angle) * 0.55;
      const z = (Math.random() - 0.5) * 2.0;
      sp.position.set(x, y, z);

      const bs = 0.48 + (i % 4) * 0.08;
      sp.scale.set(bs, bs, 1);
      scene.add(sp);
      sprites.push(sp);
      meta.push({
        bp: new THREE.Vector3(x, y, z),
        bs,
        fAmp: 0.08 + Math.random() * 0.14,
        fSpd: 0.22 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
        orb: 0.05 + Math.random() * 0.08,
        targetOpacity: PALETTE[pi].opacity,
      });

      gsap.to(mat, {
        opacity: PALETTE[pi].opacity,
        duration: 1.2 + Math.random(),
        delay: 0.15 + i * 0.07,
        ease: "power2.inOut",
      });
    });

    /* Connection lines — purple tinted */
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0,
    });
    gsap.to(lineMat, { opacity: 0.18, duration: 2.5, delay: 1.5 });
    const MAX = 160;
    const lp = new Float32Array(MAX * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    lGeo.setDrawRange(0, 0);
    scene.add(new THREE.LineSegments(lGeo, lineMat));

    /* Dust — purple micro-particles */
    const N = 420;
    const dp = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      dp[i * 3] = (Math.random() - 0.5) * 18;
      dp[i * 3 + 1] = (Math.random() - 0.5) * 11;
      dp[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    const dMat = new THREE.PointsMaterial({
      size: 0.016,
      color: 0xa855f7,
      transparent: true,
      opacity: 0,
    });
    const dust = new THREE.Points(dGeo, dMat);
    scene.add(dust);
    gsap.to(dMat, { opacity: 0.28, duration: 2.2, delay: 1 });

    /* Large faint ring — accent */
    const ringGeo = new THREE.TorusGeometry(4.5, 0.004, 4, 140);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3.5;
    scene.add(ring);
    gsap.to(ringMat, { opacity: 0.08, duration: 3, delay: 1.2 });

    /* Resize */
    const onResize = () => {
      const w = cv.offsetWidth,
        h = cv.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener("resize", onResize);

    /* Mouse */
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e) => {
      m.tx = (e.clientX / innerWidth - 0.5) * 2;
      m.ty = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    /* Animate */
    let animId;
    const CDIST = 2.5;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      m.x += (m.tx - m.x) * 0.032;
      m.y += (m.ty - m.y) * 0.032;
      camera.position.x += (m.x * 0.38 - camera.position.x) * 0.025;
      camera.position.y += (m.y * 0.26 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      sprites.forEach((sp, i) => {
        const d = meta[i],
          ft = t * d.fSpd + d.phase;
        sp.position.x = d.bp.x + Math.sin(ft * 0.55 + d.phase) * d.orb;
        sp.position.y = d.bp.y + Math.sin(ft) * d.fAmp;
        sp.position.z = d.bp.z + Math.cos(ft * 0.4) * d.orb * 0.5;
        const pulse = 1 + Math.sin(t * d.fSpd * 1.4 + d.phase) * 0.03;
        sp.scale.set(d.bs * pulse, d.bs * pulse, 1);
      });

      let seg = 0;
      for (let i = 0; i < sprites.length && seg < MAX; i++) {
        for (let j = i + 1; j < sprites.length && seg < MAX; j++) {
          if (sprites[i].position.distanceTo(sprites[j].position) < CDIST) {
            const k = seg * 6;
            lp[k] = sprites[i].position.x;
            lp[k + 1] = sprites[i].position.y;
            lp[k + 2] = sprites[i].position.z;
            lp[k + 3] = sprites[j].position.x;
            lp[k + 4] = sprites[j].position.y;
            lp[k + 5] = sprites[j].position.z;
            seg++;
          }
        }
      }
      lGeo.attributes.position.needsUpdate = true;
      lGeo.setDrawRange(0, seg * 2);

      ring.rotation.z = t * 0.035;
      dust.rotation.y = t * 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  /* ── GSAP entrance ───────────────────────────────────────────── */
  useEffect(() => {
    if (!ready) return;
    const lines = headline.current?.querySelectorAll(".hero-line");
    if (!lines?.length) return;
    gsap.defaults({ force3D: true });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      badge.current,
      { opacity: 0.01, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    )
      .to(badge.current, {
        keyframes: [
          { x: -3, duration: 0.05 },
          { x: 3, duration: 0.05 },
          { x: -2, duration: 0.04 },
          { x: 0, duration: 0.05 },
        ],
      })
      .fromTo(
        lines,
        { opacity: 0.01, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.2",
      )
      .fromTo(
        subtext.current,
        { opacity: 0.01, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        buttons.current.children,
        { opacity: 0.01, scale: 0.85, y: 14 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        "-=0.25",
      )
      .fromTo(
        stats.current.children,
        { opacity: 0.01, y: 22 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.2",
      );
    return () => tl.kill();
  }, [ready]);

  /* ── Magnetic buttons ───────────────────────────────────────── */
  useEffect(() => {
    if (!buttons.current) return;
    const cleanups = Array.from(buttons.current.children).map((btn) => {
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.3,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const leave = () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.4)" });
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  /* ── Custom cursor ──────────────────────────────────────────── */
  useEffect(() => {
    const cr = cursor.current,
      dt = cursorDot.current;
    if (!cr || !dt) return;
    let cx = 0,
      cy = 0,
      tx = 0,
      ty = 0;
    const mv = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", mv);
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      cr.style.transform = `translate(${cx - 16}px,${cy - 16}px)`;
      dt.style.transform = `translate(${tx - 3}px,${ty - 3}px)`;
    };
    loop();
    const g = () => gsap.to(cr, { scale: 2.2, opacity: 0.5, duration: 0.3 }),
      s = () => gsap.to(cr, { scale: 1, opacity: 1, duration: 0.3 });
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", g);
      el.addEventListener("mouseleave", s);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", mv);
    };
  }, []);

  /* ── Scroll parallax ────────────────────────────────────────── */
  useEffect(() => {
    const fn = () => {
      const y = scrollY;
      if (headline.current) gsap.set(headline.current, { y: y * 0.22 });
      if (subtext.current) gsap.set(subtext.current, { y: y * 0.12 });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={cursor} style={CS} />
      <div ref={cursorDot} style={DS} />
      <section ref={section} className="hero-section" id="home">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-gradient-overlay" />

        <div className="hero-grid-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="grid-line" style={{ "--i": i }} />
          ))}
        </div>

        {/* Tech name chips — purple tinted */}
        <div className="hero-tech-chips" aria-hidden="true">
          {ICONS.map((ic, i) => (
            <span
              key={ic.name}
              className="hero-tech-chip"
              style={{ "--ci": i }}
            >
              {ic.name}
            </span>
          ))}
        </div>

        <div className="container-xl hero-content">
          <div ref={badge} className="label-chip hero-badge">
            <span className="dot dot--pulse" />
            Full-Stack Development Studio
          </div>

          <h1 ref={headline} className="hero-headline">
            <div className="hero-line">
              <span ref={line1}>We Build</span>
            </div>
            <div className="hero-line">
              <span ref={line2} className="gradient-text">
                Powerful
              </span>{" "}
              Digital
            </div>
            <div className="hero-line">Systems</div>
          </h1>

          <p ref={subtext} className="hero-subtext">
            Itera crafts scalable web platforms, custom management systems, and
            modern digital experiences — engineered for performance, designed
            for people.
          </p>

          <div ref={buttons} className="hero-buttons">
            <button
              className="btn-itera hero-btn-primary"
              onClick={() => scrollTo("#projects")}
            >
              View Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="btn-itera-outline hero-btn-outline"
              onClick={() => scrollTo("#contact")}
            >
              Start a Project
            </button>
          </div>

          <div ref={stats} className="hero-stats">
            {[
              {
                value: "5",
                suffix: "",
                label: "Projects Delivered",
                delay: 900,
              },
              {
                value: "100",
                suffix: "%",
                label: "Client Satisfaction",
                delay: 1050,
              },
              {
                value: "1",
                suffix: "+",
                label: "Years Experience",
                delay: 1200,
              },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">
                  <Counter to={s.value} suffix={s.suffix} delay={s.delay} />
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}

const CS = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1.5px solid rgba(124,58,237,0.7)",
  pointerEvents: "none",
  zIndex: 9999,
  willChange: "transform",
};
const DS = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "#7C3AED",
  pointerEvents: "none",
  zIndex: 9999,
  willChange: "transform",
};
